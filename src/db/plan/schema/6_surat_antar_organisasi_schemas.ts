/**
 * Migrasi #6: Surat antar organisasi
 *
 * Tabel: letters
 * Bergantung pada: 1_platform_pendaftaran_schemas, 4_arsip_dokumen_schemas
 */
import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
  type AnySQLiteColumn,
} from "drizzle-orm/sqlite-core";
import { pk, ts, timestamps } from "./_common";
import { organizations, users } from "./1_platform_pendaftaran_schemas";

export const LETTER_STATUSES = [
  "draft",
  "terkirim",
  "dibaca",
  "dibatalkan",
] as const;

export const letters = sqliteTable(
  "letters",
  {
    id: pk(),
    fromOrgId: text("from_org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "restrict" }),
    toOrgId: text("to_org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "restrict" }),
    type: text("type").notNull(),
    fileKey: text("file_key").notNull(),
    fileName: text("file_name").notNull(),
    mimeType: text("mime_type").notNull(),
    sizeBytes: integer("size_bytes").notNull(),
    letterNumber: text("letter_number").notNull(),
    letterDate: ts("letter_date").notNull(),
    status: text("status", { enum: LETTER_STATUSES })
      .notNull()
      .default("draft"),
    replyToId: text("reply_to_id").references(
      (): AnySQLiteColumn => letters.id,
      {
        onDelete: "restrict",
      },
    ),
    createdBy: text("created_by")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    sentBy: text("sent_by").references(() => users.id, {
      onDelete: "set null",
    }),
    sentAt: ts("sent_at"),
    readBy: text("read_by").references(() => users.id, {
      onDelete: "set null",
    }),
    readAt: ts("read_at"),
    cancelReason: text("cancel_reason"),
    ...timestamps,
  },
  (t) => [
    check("letters_distinct_orgs_check", sql`${t.fromOrgId} <> ${t.toOrgId}`),
    check(
      "letters_cancel_reason_check",
      sql`${t.status} <> 'dibatalkan' OR (${t.cancelReason} IS NOT NULL AND length(trim(${t.cancelReason})) > 0)`,
    ),
    uniqueIndex("letters_from_number_uq").on(t.fromOrgId, t.letterNumber),
    index("letters_inbox_idx").on(t.toOrgId, t.status, t.createdAt),
    index("letters_outbox_idx").on(t.fromOrgId, t.status, t.createdAt),
    index("letters_reply_to_idx").on(t.replyToId),
  ],
);

export type Letter = typeof letters.$inferSelect;
export type NewLetter = typeof letters.$inferInsert;
