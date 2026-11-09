/**
 * Helper bersama untuk semua file schema.
 * Konvensi:
 * - ID: text (cuid2), bukan autoincrement
 * - Waktu: integer mode "timestamp" (detik sejak epoch)
 * - Uang: integer dalam rupiah (tanpa desimal)
 * - Enum: text dengan { enum: [...] } (SQLite tidak punya tipe enum)
 * - Setiap data operasional membawa orgId (isolasi antar organisasi dijaga di lapisan akses data)
 * - Aktifkan PRAGMA foreign_keys = ON dan journal_mode = WAL saat membuka koneksi
 */
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";

export const pk = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => createId());

export const ts = (name: string) => integer(name, { mode: "timestamp" });

export const timestamps = {
  createdAt: ts("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: ts("updated_at")
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdateFn(() => new Date()),
  deletedAt: ts("deleted_at"),
};
