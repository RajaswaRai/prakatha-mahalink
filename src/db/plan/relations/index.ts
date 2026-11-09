/**
 * Gabungan semua relasi, urutan sesuai urutan migrasi.
 *
 * Pemakaian:
 *   import { drizzle } from "drizzle-orm/libsql"; // atau better-sqlite3, sesuai driver Anda
 *   import { relations } from "@/db/relations";
 *   const db = drizzle({ client, relations });
 *   await db.query.events.findMany({ with: { pic: true, registrations: true } });
 */
import { platformPendaftaranRelations } from "./1_platform_pendaftaran_relations";
import { keanggotaanKepengurusanRelations } from "./2_keanggotaan_kepengurusan_relations";
import { agendaAcaraRelations } from "./3_agenda_acara_relations";
import { arsipDokumenRelations } from "./4_arsip_dokumen_relations";
import { keuanganRelations } from "./5_keuangan_relations";
import { suratAntarOrganisasiRelations } from "./6_surat_antar_organisasi_relations";
import { inventarisAsetRelations } from "./7_inventaris_aset_relations";
import { blogRelations } from "./8_blog_relations";
import { notifikasiAuditRelations } from "./9_notifikasi_audit_relations";

export const relations = {
  ...platformPendaftaranRelations,
  ...keanggotaanKepengurusanRelations,
  ...agendaAcaraRelations,
  ...arsipDokumenRelations,
  ...keuanganRelations,
  ...suratAntarOrganisasiRelations,
  ...inventarisAsetRelations,
  ...blogRelations,
  ...notifikasiAuditRelations,
};
