/**
 * Migrasi #9: Notifikasi & audit
 *
 * Tabel: notifications, audit_logs
 * Bergantung pada: 1_platform_pendaftaran_schemas, 2_keanggotaan_kepengurusan_schemas
 */
import { sql } from "drizzle-orm";
import {
  index,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { pk, ts } from "./_common";
import { organizations, users } from "./1_platform_pendaftaran_schemas";
import { members } from "./2_keanggotaan_kepengurusan_schemas";

/* Nilai enum (dipakai juga di validasi form / Zod) */
export const NOTIF_CHANNELS = ["inapp", "email", "whatsapp"] as const;
export const NOTIF_STATUSES = ["antri", "terkirim", "gagal"] as const;

// Satu tabel untuk notifikasi in-app, email, dan WhatsApp (sekaligus log pesan terkirim)
export const notifications = sqliteTable(
  "notifications",
  {
    id: pk(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    memberId: text("member_id").references(() => members.id, {
      onDelete: "set null",
    }),
    channel: text("channel", { enum: NOTIF_CHANNELS }).notNull(),
    template: text("template"),
    body: text("body").notNull(),
    status: text("status", { enum: NOTIF_STATUSES }).notNull().default("antri"),
    refType: text("ref_type"),
    refId: text("ref_id"),
    sentAt: ts("sent_at"),
    createdAt: ts("created_at")
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [
    index("notif_user_idx").on(t.userId, t.status),
    index("notif_queue_idx").on(t.status, t.channel),
  ],
);

export const auditLogs = sqliteTable(
  "audit_logs",
  {
    id: pk(),
    orgId: text("org_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    userId: text("user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    action: text("action").notNull(), // contoh: "transaction.void"
    entity: text("entity").notNull(),
    entityId: text("entity_id"),
    changes: text("changes", { mode: "json" }).$type<Record<string, unknown>>(),
    createdAt: ts("created_at")
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [
    index("audit_org_created_idx").on(t.orgId, t.createdAt),
    index("audit_entity_idx").on(t.entity, t.entityId),
  ],
);
