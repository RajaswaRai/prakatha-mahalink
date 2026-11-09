# Prompt: Update Kode ke PRD v0.2 dan ERD Revisi 0.3

> Cara pakai: tempel seluruh isi file ini ke asisten kode (Claude Code, Cursor, dll.) di root proyek.
> Lampirkan juga: `db.zip` (skema terbaru), `PRD_Pusat_Kemahasiswaan_v0_2.pdf`, dan `ERD_Otorisasi_dan_Surat_Revisi_0_3.pdf`.

---

## 0. Peran dan tujuan

Kamu adalah engineer senior yang memperbarui proyek **Web App Pusat Kemahasiswaan** (platform multi-organisasi untuk satu kampus) dari **versi sebelumnya (PRD/ERD v0.1)** ke **PRD v0.2 + ERD Revisi 0.3**.

Urutan dokumen proyek: **PRD → ERD → Database → Kode.** Bila dokumen bertentangan, PRD menang atas ERD. Jangan menebak: bila ada keputusan yang belum jelas, ikuti bagian 9 (keputusan terbuka dengan default sementara) dan tandai dengan komentar `// KEPUTUSAN-TERBUKA: <nomor>`.

**Stack:** Next.js (App Router, fullstack), Drizzle ORM v1 (RQB v2, `defineRelations`/`defineRelationsPart`), SQLite via libsql, UI berbahasa Indonesia.

## 1. Aturan kerja (wajib)

1. **Audit dulu, ubah kemudian.** Langkah 1 hanya membaca dan melaporkan (lihat bagian 3). Jangan mengubah kode sebelum laporan audit selesai.
2. **Kerjakan per fase** (bagian 4). Satu fase = satu commit/PR kecil, dengan `tsc --noEmit`, lint, dan tes lulus sebelum lanjut.
3. **Skema database adalah sumber kebenaran.** Salin folder `db/` dari `db.zip` (timpa `db/schema` dan `db/relations`). **Jangan menulis ulang atau "memperbaiki" skema** tanpa izin. Bila skema tampak kurang, laporkan.
4. **Jangan mengedit file migrasi yang sudah diterapkan.** Jangan pakai `drizzle-kit push`. Hanya `generate` + `migrate`.
5. Pertahankan konvensi: ID `text` (cuid2), waktu `integer` mode timestamp, uang `integer` rupiah, enum `text` dengan daftar nilai, kolom standar `created_at/updated_at/deleted_at`.
6. **Setiap query data organisasi wajib memfilter `org_id` dari sesi**, kecuali pengecualian di bagian 6.
7. Operasi multi-langkah wajib dalam **satu transaksi database** (`db.transaction`).
8. Jangan menambah dependensi baru tanpa menyebutnya di laporan. Jangan menghapus fitur yang tidak disebut di dokumen ini.
9. Teks antarmuka dan pesan error: Bahasa Indonesia.
10. Akhiri tiap fase dengan ringkasan: file yang berubah, perintah yang dijalankan, hasil tes, dan hal yang belum selesai.

## 2. Ringkasan perubahan: versi lama → versi baru

### 2.1 Tiga perubahan besar

| #   | Lama (v0.1)                                                                        | Baru (PRD v0.2 / ERD Rev 0.2–0.3)                                                                |
| --- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1   | Login email + kata sandi (opsi Google), registrasi manual, reset kata sandi        | **Login hanya dengan Google.** Tidak ada kata sandi lokal, registrasi manual, maupun reset sandi |
| 2   | `users.platform_role`: `super_admin`, `staf_pk`, `mahasiswa` (default `mahasiswa`) | `mahasiswa`, `dosen`, `admin` (**tanpa default**; wajib disebut eksplisit saat membuat user)     |
| 3   | Tidak ada surat antar organisasi                                                   | **Modul baru: surat antar organisasi** + peminjaman aset lintas organisasi + pengingat otomatis  |

### 2.2 Perubahan skema (sudah ada di `db.zip`, 36 → 37 tabel)

| Tabel                | Perubahan                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `users`              | `platform_role` enum baru, tanpa default. `password_hash` tidak dipakai (kolom tetap ada, boleh kosong). `google_id` dipakai untuk mencocokkan user. `nim` tetap satu-satunya identitas mahasiswa (**tidak ada `nidn`**)                                                                                                                                                              |
| `member_positions`   | `app_role` ditambah nilai **`pembina`** (dosen pembina; hak lihat saja)                                                                                                                                                                                                                                                                                                               |
| `letters` (**baru**) | `from_org_id`, `to_org_id` (restrict), `type`, `file_key`, `file_name`, `mime_type`, `size_bytes`, `letter_number` (wajib), `letter_date`, `status` (`draft`/`terkirim`/`dibaca`/`dibatalkan`), `reply_to_id`, `created_by`, `sent_by`, `sent_at`, `read_by`, `read_at`, `cancel_reason`. Constraint: pengirim ≠ penerima; batal wajib beralasan; unik `(from_org_id, letter_number)` |
| `assets`             | `is_lendable` (boolean, default `false`)                                                                                                                                                                                                                                                                                                                                              |
| `asset_loans`        | `letter_id`, `borrower_org_id` (null = peminjaman internal), `decision_note`, `returned_condition`, `return_note`; indeks jatuh tempo                                                                                                                                                                                                                                                 |

### 2.3 Penomoran file schema/relations (bergeser)

| No  | File                                |
| --- | ----------------------------------- |
| 1   | `platform_pendaftaran`              |
| 2   | `keanggotaan_kepengurusan`          |
| 3   | `agenda_acara`                      |
| 4   | `arsip_dokumen`                     |
| 5   | `keuangan`                          |
| 6   | `surat_antar_organisasi` **(baru)** |
| 7   | `inventaris_aset` (dulu 6)          |
| 8   | `blog` (dulu 7)                     |
| 9   | `notifikasi_audit` (dulu 8)         |

Pola nama: `db/schema/{no}_{fitur}_schemas.ts` dan `db/relations/{no}_{fitur}_relations.ts`; `db/relations/index.ts` menggabungkan semua bagian dengan spread. `drizzle.config.ts` memakai `SCHEMA_UPTO` untuk migrasi bertahap dan glob `*_schemas.ts`.

### 2.4 Penyesuaian terhadap ERD (PRD menang)

- **Surat = berkas yang diunggah, satu berkas per surat.** Tidak ada kolom `subject`/`body`. Tidak ada editor surat dan tidak ada tanda tangan digital.
- **Nomor surat dialokasikan saat draf dibuat** (PRD 6.8), bukan saat dikirim. Konsekuensi: draf yang dibatalkan meninggalkan nomor kosong, ini diterima.
- **Tidak ada surat balasan otomatis** saat peminjaman disetujui/ditolak (ERD menyebutnya, tetapi surat wajib berkas). Gantinya: simpan keputusan di `asset_loans` (`status`, `decision_note`) dan kirim **notifikasi** ke peminjam. Pemilik aset boleh membalas dengan mengunggah surat `balasan` secara manual.
- `documents.letter_id` **tidak ada** (berkas surat tersimpan di `letters` sendiri).

## 3. Fase 1 (hanya baca): audit kode saat ini

Jangan mengubah apa pun. Hasilkan laporan Markdown berisi:

1. **Autentikasi:** semua kode terkait kata sandi (`password`, `bcrypt`, `argon`, `hash`, reset token), halaman/route `/daftar`, `/register`, `/lupa-sandi`, `/reset-sandi`, dan library auth yang dipakai.
2. **Peran lama:** semua kemunculan `super_admin`, `staf_pk`, `platformRole`, `platform_role`, dan pengecekan peran/izin (middleware, server action, komponen).
3. **Akses data:** daftar query/repository yang menyentuh data organisasi dan apakah sudah memfilter `org_id`.
4. **Inventaris:** kode peminjaman aset yang ada (halaman, aksi, validasi stok).
5. **Notifikasi dan job terjadwal** yang sudah ada (email, cron).
6. **Penyimpanan file** (unggah, `file_key`, signed URL) yang bisa dipakai ulang untuk berkas surat.
7. Impor ke `db/old_schema.ts` atau `db/old_relations.ts` (file legacy; usulkan penghapusan bila tidak dipakai).
8. Daftar semua rute saat ini vs rute target di bagian 8.

Tutup laporan dengan **rencana perubahan per fase** dan daftar risiko. Tunggu konfirmasi sebelum fase 2.

## 4. Fase-fase pengerjaan

### Fase 2: Sinkronisasi database

1. Salin `db/schema` dan `db/relations` dari `db.zip`. Pastikan `tsc` lulus.
2. Perbarui `drizzle.config.ts` (glob `*_schemas.ts`, `SCHEMA_UPTO`, `dbCredentials`).
3. `npx drizzle-kit generate --name=surat_pinjam_pembina_login_google`. **Tinjau `migration.sql`** (jangan langsung migrate), lalu:
   - Pastikan isinya hanya: pembuatan ulang `users` (default `platform_role` dihapus), `CREATE TABLE letters`, `ALTER TABLE` pada `assets`/`asset_loans`, dan indeks baru.
   - **Edit manual** dua baris `ALTER` agar aturan hapus FK ikut (drizzle-kit tidak menuliskannya):
     ```sql
     ALTER TABLE `asset_loans` ADD `letter_id` text REFERENCES letters(id) ON DELETE set null;
     ALTER TABLE `asset_loans` ADD `borrower_org_id` text REFERENCES organizations(id) ON DELETE restrict;
     ```
   - **Tambahkan di akhir file** konversi data peran lama:
     ```sql
     --> statement-breakpoint
     UPDATE `users` SET `platform_role` = 'admin' WHERE `platform_role` IN ('super_admin', 'staf_pk');
     ```
4. **Cadangkan database**, lalu `npx drizzle-kit migrate`. Verifikasi: jumlah baris `users`, `sessions`, `organizations`, `assets`, `asset_loans` sebelum dan sesudah **sama**; tidak ada baris `platform_role` bernilai lama; `PRAGMA foreign_key_list(asset_loans)` menunjukkan `SET NULL` dan `RESTRICT` untuk dua kolom baru.
5. Pastikan koneksi menjalankan `PRAGMA foreign_keys = ON` dan `journal_mode = WAL`.
6. Perbarui skrip npm migrasi menjadi 9 langkah (`SCHEMA_UPTO=1..9`) dengan `cross-env`.

**Selesai bila:** `tsc` lulus, 37 tabel ada, data lama utuh, aplikasi lama masih bisa dijalankan.

### Fase 3: Autentikasi hanya Google

1. Hapus: halaman dan aksi registrasi manual, lupa/reset sandi, form login kata sandi, dan kode hash kata sandi. **Jangan menghapus kolom `password_hash`.**
2. Implementasikan Google OAuth (gunakan library yang sudah dipakai; bila belum ada, usulkan Auth.js dan tunggu persetujuan).
3. Alur login (ERD bagian 7):
   - Terima `email`, `name`, `google_id` (`sub`). **Tolak bila email Google belum terverifikasi.**
   - Cocokkan user lewat `google_id`, bila tidak ada lewat `email` (lalu isi `google_id`). Bila tidak ada sama sekali, buat baris `users` dengan `status = 'menunggu'` dan **`platformRole` disebut eksplisit** lewat satu fungsi `resolveInitialPlatformRole()` (lihat keputusan 1).
   - Sesi disimpan di tabel `sessions`; `org_id` aktif disimpan di sesi setelah pengguna memilih organisasi.
4. Halaman baru: **lengkapi profil** (mahasiswa mengisi NIM, prodi, angkatan; **dosen tidak diminta NIM**) dan **menunggu aktivasi**. Akun berstatus selain `aktif` hanya boleh mengakses halaman lengkapi profil.
5. Admin: halaman daftar akun untuk mengaktifkan/menonaktifkan dan mengubah `platform_role`.
6. Aturan keamanan (ERD 8.2): hanya admin yang boleh mengubah `platform_role` dan `status`; pengguna tidak boleh mengubah perannya sendiri; **selalu ada minimal satu admin aktif** (tolak menurunkan/menonaktifkan admin terakhir); semua perubahan peran/status ditulis ke `audit_logs` **dalam transaksi yang sama**.
7. Skrip seed admin pertama: `scripts/seed-admin.ts` membaca `ADMIN_EMAIL` dari env (keputusan 2).

**Selesai bila:** tidak ada kode kata sandi yang tersisa; login Google membuat user berstatus `menunggu`; admin dapat mengaktifkan; tes untuk aturan admin terakhir dan eskalasi peran sendiri lulus.

### Fase 4: Otorisasi dua tingkat

1. Buat satu modul terpusat, mis. `lib/access.ts`, dengan fungsi `getAccess(session)` yang mengembalikan `{ platformRole, orgId, appRole | null }` mengikuti ERD bagian 2:
   - Cek `platform_role`; bila `admin`, pakai jalur admin.
   - Bila bukan, ambil `org_id` dari sesi, cari `members` miliknya di organisasi itu, lalu baca `app_role` dari `member_positions` pada periode dengan `is_current = true`. Tanpa keanggotaan = bukan anggota.
2. Ganti **semua** pengecekan peran lama (`super_admin`, `staf_pk`) dengan helper ini. Hapus pengecekan yang tersebar di komponen.
3. Terapkan matriks hak akses (bagian 5) sebagai fungsi `can(access, action, resource)` yang dipakai di **server action dan route handler** (bukan hanya di menu).
4. Query data organisasi lewat helper yang **memaksa filter `org_id`**; sediakan jalur terpisah dan eksplisit untuk pengecualian (bagian 6).
5. Peran `pembina`: hanya **lihat** pada organisasi binaannya.

**Selesai bila:** tidak ada string peran lama di kode; tes matriks hak akses lulus untuk setiap peran × fungsi utama; tes isolasi data lintas organisasi lulus.

### Fase 5: Aset yang boleh dipinjamkan dan peminjaman lintas organisasi

1. Form aset: toggle `is_lendable` (hanya ketua dan staf inventaris).
2. **Katalog aset yang boleh dipinjam** (organisasi lain, `is_lendable = true`, organisasi pemilik berstatus `aktif`): hanya baca, dengan kolom terbatas (nama, kategori, kondisi, jumlah tersedia, foto, organisasi pemilik). Jangan membocorkan data aset lain.
3. Jumlah tersedia = `quantity` dikurangi total `qty` pada `asset_loans` berstatus `disetujui` atau `dipinjam`.
4. Alur status peminjaman: `diajukan` → `disetujui` → `dipinjam` → `kembali`, atau `ditolak`.
   - **Persetujuan:** hanya staf inventaris atau ketua organisasi **pemilik** aset; cek ketersediaan di dalam transaksi; isi `approved_by`.
   - **Penolakan:** `decision_note` **wajib**.
   - **Serah terima** (`dipinjam`) dan **pengembalian** (`kembali`) dikonfirmasi oleh **pemilik aset**, bukan peminjam. Pengembalian mengisi `returned_at`, `returned_condition`, `return_note`.
   - **"Terlambat" tidak disimpan**; hitung dari `status = 'dipinjam'` dan `due_date < sekarang`.
5. Organisasi tidak boleh meminjam asetnya sendiri lewat jalur lintas organisasi. Peminjaman internal (`borrower_org_id` null) tetap berjalan seperti sebelumnya.
6. Halaman: daftar pinjaman keluar/masuk per organisasi, filter terlambat.

**Selesai bila:** tes stok (tidak boleh melebihi jumlah), tes keputusan wajib alasan, dan tes hanya pemilik yang boleh mengonfirmasi lulus.

### Fase 6: Modul surat antar organisasi

Aturan produk (PRD 6.8): surat = **berkas** (PDF, DOCX, gambar), satu berkas per surat; penerima hanya organisasi di platform; surat terkirim **tidak dapat diubah**.

1. **Draf:** unggah berkas ke object storage (`file_key` pola `letters/{fromOrgId}/{letterId}/{namaBerkas}`), validasi tipe dan ukuran (keputusan 12), pilih organisasi penerima (aktif, bukan diri sendiri) dan tipe surat. Nomor surat dialokasikan **saat draf dibuat** dengan upsert atomik:
   ```sql
   INSERT INTO letter_sequences (id, org_id, year, last_number) VALUES (?, ?, ?, 1)
   ON CONFLICT (org_id, year) DO UPDATE SET last_number = last_number + 1
   RETURNING last_number;
   ```
   (dalam transaksi yang sama dengan insert `letters`; format nomor: keputusan 10).
2. **Kirim:** satu transaksi: ubah status `draft` → `terkirim`, isi `sent_by`/`sent_at`; untuk tipe `peminjaman_aset` buat baris `asset_loans` berstatus `diajukan` (satu per aset, dengan `letter_id`, `borrower_org_id`, `borrower_id` = penanggung jawab dari organisasi peminjam, `loan_date`, `due_date`); kirim notifikasi ke pengurus penerima; tulis `audit_logs`. **Gagal satu = batal semua.** Organisasi berstatus `dibekukan`/`nonaktif` tidak boleh mengirim atau menerima surat baru.
3. **Kotak surat:** masuk (`to_org_id`) dan keluar (`from_org_id`), filter status, unduh/pratinjau berkas lewat signed URL **setelah cek akses**. Draf hanya terlihat oleh pengirimnya. Surat terkirim terlihat oleh pengurus berwenang di organisasi pengirim **dan** penerima.
4. **Dibaca:** saat pengurus penerima pertama kali membuka surat, set `status = 'dibaca'`, `read_by`, `read_at` (hanya sekali).
5. **Balas:** surat baru bertipe `balasan` dengan `reply_to_id`; tampilkan riwayat percakapan.
6. **Batalkan:** status `dibatalkan` dengan `cancel_reason` wajib (juga dijaga constraint DB). Tidak ada edit isi surat terkirim; koreksi lewat surat balasan atau pembatalan.
7. Audit: setiap perubahan status surat dan peminjaman ditulis ke `audit_logs`.

**Selesai bila:** tes transaksi kirim (rollback penuh bila notifikasi/insert gagal), tes nomor surat tidak ganda saat dibuat paralel, tes constraint (pengirim = penerima, batal tanpa alasan, nomor ganda), tes isolasi (organisasi ketiga tidak bisa membaca/mengunduh surat) lulus.

### Fase 7: Pengingat otomatis

1. Job terjadwal (route handler `app/api/cron/loan-reminders` dilindungi `CRON_SECRET`, atau mekanisme cron yang sudah dipakai proyek).
2. Kirim pengingat untuk peminjaman berstatus `dipinjam`: **H-1**, **hari jatuh tempo**, dan **setiap hari saat terlambat**.
3. Penerima: penanggung jawab peminjam (`borrower_id`) **dan** pengurus kedua organisasi.
4. Saluran awal: notifikasi dalam aplikasi dan email (tabel `notifications`, `ref_type = 'loan'`, `ref_id`, `template`). WhatsApp **belum** dikerjakan.
5. **Idempoten:** jangan mengirim ganda pada hari yang sama untuk template dan peminjaman yang sama (cek lewat query sebelum insert; tanpa mengubah skema).
6. Gunakan indeks `loans_due_idx (status, due_date)` untuk query jatuh tempo.

**Selesai bila:** tes dengan jam yang dapat disuntik (fake clock) membuktikan H-1, jatuh tempo, dan terlambat masing-masing terkirim tepat sekali per hari.

### Fase 8: Tes, dokumentasi, dan sinkronisasi

1. Tes yang harus ada: matriks hak akses; isolasi `org_id` (termasuk surat dan katalog aset); transaksi kirim surat; persetujuan peminjaman dan stok; pengingat; aturan admin terakhir; konversi peran lama; constraint DB surat.
2. Perbarui `README`/dokumen teknis: alur login Google, model otorisasi dua tingkat, urutan migrasi 1–9.
3. Perbarui daftar rute (bagian 8) dan, bila ada, backlog.
4. Hapus `db/old_schema.ts` dan `db/old_relations.ts` **hanya bila** tidak ada yang mengimpornya dan setelah izin.

## 5. Matriks hak akses

Keterangan: ✔ boleh (tulis dan baca) · L lihat saja · – tidak boleh. Peran organisasi berlaku di organisasi tempat jabatan itu dipegang.

| Fungsi                                            | Admin             | Pembina | Mhs non-anggota | Anggota         | Sekretaris | Bendahara | Staf Inventaris                             | Ketua |
| ------------------------------------------------- | ----------------- | ------- | --------------- | --------------- | ---------- | --------- | ------------------------------------------- | ----- |
| Masuk dengan Google, kelola profil sendiri        | ✔                 | ✔       | ✔               | ✔               | ✔          | ✔         | ✔                                           | ✔     |
| Ajukan organisasi baru / pembaruan                | –                 | –       | ✔               | ✔               | ✔          | ✔         | ✔                                           | ✔     |
| Tinjau/setujui/tolak pengajuan organisasi         | ✔                 | –       | –               | –               | –          | –         | –                                           | –     |
| Aktifkan akun dan tetapkan `platform_role`        | ✔                 | –       | –               | –               | –          | –         | –                                           | –     |
| Bekukan/nonaktifkan organisasi                    | ✔                 | –       | –               | –               | –          | –         | –                                           | –     |
| Kelola anggota dan data pribadi                   | L                 | L       | –               | –               | ✔          | –         | –                                           | ✔     |
| Tetapkan jabatan dan `app_role`                   | ✔ (ketua pertama) | –       | –               | –               | –          | –         | –                                           | ✔     |
| Arsip dokumen: kelola                             | L                 | L       | L (publik)      | L               | ✔          | L         | L                                           | ✔     |
| Kas: catat transaksi, verifikasi iuran            | L                 | L       | –               | –               | –          | ✔         | –                                           | L     |
| Laporan keuangan organisasi                       | L                 | L       | –               | – (keputusan 6) | –          | ✔         | –                                           | L     |
| Aset: kelola dan setujui peminjaman               | L                 | L       | –               | –               | –          | –         | ✔                                           | L     |
| Acara: kelola                                     | L                 | L       | L (publik)      | L               | ✔          | L         | L                                           | ✔     |
| RSVP, lihat tagihan sendiri, ajukan pinjam aset   | –                 | –       | –               | ✔               | ✔          | ✔         | ✔                                           | ✔     |
| **Surat: tulis dan kirim**                        | –                 | –       | –               | –               | ✔          | –         | ✔ (hanya tipe peminjaman/pengembalian aset) | ✔     |
| **Surat: lihat kotak masuk/keluar**               | L                 | L       | –               | –               | ✔          | L         | ✔ (hanya surat aset)                        | ✔     |
| **Peminjaman aset: setujui/tolak ajuan masuk**    | –                 | –       | –               | –               | –          | –         | ✔                                           | ✔     |
| **Konfirmasi serah terima dan pengembalian**      | –                 | –       | –               | –               | –          | –         | ✔                                           | ✔     |
| **Tandai aset boleh dipinjamkan (`is_lendable`)** | –                 | –       | –               | –               | –          | –         | ✔                                           | ✔     |

Catatan:

- Admin hanya **melihat** data operasional organisasi (keputusan 7).
- Dokumen dan acara mengikuti `visibility` (privat, internal, publik); dokumen privat hanya untuk pembuat dan pengurus berwenang.
- Fungsi blog belum dimasukkan ke matriks (keputusan 8): jangan mengubah hak akses blog yang ada.

## 6. Pengecualian filter `org_id`

Satu-satunya pengecualian, dan harus **eksplisit** di kode (fungsi terpisah, bukan flag tersembunyi):

1. **Admin** (`platform_role = 'admin'`): akses lintas organisasi, hanya baca untuk data operasional.
2. **Surat dan peminjaman lintas organisasi:** terlihat oleh organisasi pengirim (`from_org_id`) dan penerima (`to_org_id`) / peminjam (`borrower_org_id`) dan pemilik aset.
3. **Katalog aset boleh dipinjam:** baca terbatas atas aset `is_lendable = true` milik organisasi aktif lain (asumsi untuk menutup celah di ERD; kolom dibatasi seperti Fase 5).

Selain itu, tidak ada query yang boleh melewati filter `org_id`.

## 7. Aturan bisnis ringkas (harus ada tesnya)

- Hanya satu periode `is_current = true` per organisasi.
- Saldo kas dihitung dari `transactions` berstatus `posted`; `void` tidak dihitung.
- Surat terkirim tidak dapat diubah; koreksi lewat balasan atau pembatalan beralasan.
- Pengiriman surat peminjaman = satu transaksi (nomor sudah ada → ubah status → buat `asset_loans` → notifikasi → audit).
- Persetujuan peminjaman sah hanya bila stok cukup; penolakan wajib beralasan.
- Hanya aset `is_lendable = true` yang dapat diajukan lintas organisasi; tidak boleh meminjam aset sendiri lewat jalur ini.
- Pengembalian dikonfirmasi pemilik aset, bukan peminjam.
- Penghapusan organisasi tidak boleh menghapus surat; pakai status `nonaktif` atau `dibekukan`.
- Admin terakhir tidak boleh diturunkan atau dinonaktifkan; perubahan peran/status akun selalu masuk `audit_logs` dalam transaksi yang sama.
- `platform_role` wajib diisi eksplisit di kode pembuat user; tidak ada nilai bawaan.

## 8. Rute: perubahan dari daftar URL sebelumnya

**Hapus:** `/daftar`, `/lupa-sandi`, `/reset-sandi/[token]`, serta form login kata sandi pada `/login` (sisakan tombol "Masuk dengan Google").

**Ganti istilah:** "PK/staf PK/super admin" → **admin** (area `/pk` boleh dipertahankan sebagai nama rute; jangan mengubah URL bila belum diminta, cukup ubah pengecekan aksesnya).

**Tambah:**

| URL                              | Halaman                                                   | Akses                                                                 |
| -------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------- |
| `/lengkapi-profil`               | Lengkapi profil (NIM/prodi/angkatan untuk mahasiswa)      | Login, status `menunggu`                                              |
| `/menunggu-aktivasi`             | Informasi menunggu aktivasi admin                         | Login, status `menunggu`                                              |
| `/pk/mahasiswa` (pakai yang ada) | Aktivasi akun dan penetapan `platform_role`               | Admin                                                                 |
| `/o/[slug]/aset/katalog`         | Katalog aset boleh dipinjam organisasi lain               | Pengurus                                                              |
| `/o/[slug]/aset/peminjaman`      | Pinjaman keluar dan masuk, filter terlambat               | Staf inventaris, Ketua                                                |
| `/o/[slug]/surat`                | Kotak surat (masuk/keluar)                                | Sekretaris, Ketua, Staf inventaris (surat aset), L: Bendahara/Pembina |
| `/o/[slug]/surat/baru`           | Buat draf (unggah berkas, pilih penerima, nomor otomatis) | Sekretaris, Ketua, Staf inventaris (tipe aset)                        |
| `/o/[slug]/surat/[id]`           | Detail, unduh berkas, balas, batalkan                     | Sesuai matriks                                                        |
| `/api/cron/loan-reminders`       | Job pengingat (dilindungi `CRON_SECRET`)                  | Sistem                                                                |

## 9. Keputusan terbuka dan default sementara

Implementasikan default berikut **dan kumpulkan semuanya di satu berkas konfigurasi** (mis. `lib/config/decisions.ts`) agar mudah diganti. Tandai tiap pemakaian dengan `// KEPUTUSAN-TERBUKA: <nomor>`.

| No  | Pertanyaan                                                       | Default sementara                                                                                                                          |
| --- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Membedakan mahasiswa dan dosen saat login pertama                | Akun baru dibuat sebagai `mahasiswa` + `menunggu`; admin mengubah ke `dosen` saat aktivasi. Fungsi `resolveInitialPlatformRole()` terpusat |
| 2   | Admin pertama                                                    | Dibuat lewat `scripts/seed-admin.ts` dari env `ADMIN_EMAIL`                                                                                |
| 3   | Akun langsung aktif atau menunggu admin                          | Menunggu admin (`status = 'menunggu'` sampai diaktifkan)                                                                                   |
| 4   | Peran dosen                                                      | `pembina` lewat `member_positions` (sudah di skema); admin yang menautkan, dosen tidak bisa menetapkan dirinya                             |
| 5   | Dosen mengajukan organisasi / menyetujui                         | Tidak (hanya lihat)                                                                                                                        |
| 6   | Ketua lihat audit log organisasi; anggota lihat laporan keuangan | Tidak untuk keduanya                                                                                                                       |
| 7   | Batas peran admin                                                | Hanya lihat data operasional                                                                                                               |
| 8   | Penulis/editor blog                                              | Di luar lingkup; jangan ubah hak akses blog                                                                                                |
| 9   | Penerima surat                                                   | Hanya antar organisasi di platform                                                                                                         |
| 10  | Format nomor surat                                               | `{urut 3 digit}/{kode organisasi}/{bulan romawi}/{tahun}`, contoh `012/HMTI/X/2026`                                                        |
| 11  | Persetujuan peminjaman                                           | Staf inventaris **atau** ketua cukup salah satu                                                                                            |
| 12  | Sanksi keterlambatan; jenis dan ukuran berkas                    | Peringatan saja (tanpa blokir). Berkas: PDF, DOCX, JPG, PNG; maksimal 10 MB                                                                |
| 13  | Tanda tangan digital                                             | Tidak ada                                                                                                                                  |

Bila ada keputusan di luar tabel ini yang menghambat, **berhenti dan tanyakan**; jangan mengarang aturan baru.

## 10. Larangan

- Jangan menambah kolom `nidn`/`nip`, `subject`, `body`, atau tabel baru di luar skema `db.zip`.
- Jangan mengubah file migrasi lama, dan jangan memakai `push`.
- Jangan menyimpan kata sandi atau membuat alur kata sandi lokal.
- Jangan membuat surat balasan otomatis tanpa berkas.
- Jangan menyimpan status "terlambat" sebagai kolom.
- Jangan melewati filter `org_id` di luar tiga pengecualian bagian 6.
- Jangan menghapus data pengguna/organisasi secara fisik; pakai status.
- Jangan mengerjakan WhatsApp, blog, atau Figma/UI desain baru dalam pekerjaan ini.

## 11. Format laporan akhir yang diminta

Setelah setiap fase dan di akhir seluruh pekerjaan, laporkan:

1. **Ringkasan:** apa yang selesai dan apa yang belum.
2. **Daftar file** dibuat/diubah/dihapus.
3. **Perintah** yang dijalankan (`tsc`, lint, tes, `drizzle-kit`) dan hasilnya.
4. **SQL migrasi** final untuk saya tinjau (Fase 2).
5. **Tes** yang ditambahkan dan hasilnya.
6. **Keputusan terbuka** yang kamu pakai defaultnya, beserta lokasi kodenya.
7. **Risiko dan hal yang perlu saya putuskan.**

**Mulai dari Fase 1 (audit). Jangan mengubah kode sebelum saya setujui laporannya.**
