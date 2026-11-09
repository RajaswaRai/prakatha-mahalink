/**
 * Migrasi #2: Keanggotaan & kepengurusan
 *
 * Tabel: members, periods, divisions, member_positions, membership_applications
 * Bergantung pada: 1_platform_pendaftaran_schemas
 */
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { pk, ts, timestamps } from "./_common";
import { organizations, users } from "./1_platform_pendaftaran_schemas";

/* Nilai enum (dipakai juga di validasi form / Zod) */
export const MEMBER_STATUSES = ["aktif", "nonaktif", "alumni"] as const;
export const APP_ROLES = [
  "ketua",
  "sekretaris",
  "bendahara",
  "staf_inventaris",
  "anggota",
  "pembina",
] as const;
export const JOIN_STATUSES = ["menunggu", "disetujui", "ditolak"] as const;

export const members = sqliteTable(
  "members",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    joinedAt: ts("joined_at"),
    status: text("status", { enum: MEMBER_STATUSES })
      .notNull()
      .default("aktif"),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("members_org_user_uq").on(t.orgId, t.userId),
    index("members_org_status_idx").on(t.orgId, t.status),
  ],
);

export type Member = typeof members.$inferSelect;

export const periods = sqliteTable(
  "periods",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(), // contoh: "2026/2027"
    startDate: ts("start_date").notNull(),
    endDate: ts("end_date"),
    isCurrent: integer("is_current", { mode: "boolean" })
      .notNull()
      .default(false),
    ...timestamps,
  },
  (t) => [index("periods_org_idx").on(t.orgId, t.isCurrent)],
);

export const divisions = sqliteTable(
  "divisions",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    ...timestamps,
  },
  (t) => [index("divisions_org_idx").on(t.orgId)],
);

export const memberPositions = sqliteTable(
  "member_positions",
  {
    id: pk(),
    memberId: text("member_id")
      .notNull()
      .references(() => members.id, { onDelete: "cascade" }),
    periodId: text("period_id")
      .notNull()
      .references(() => periods.id, { onDelete: "cascade" }),
    divisionId: text("division_id").references(() => divisions.id, {
      onDelete: "set null",
    }),
    title: text("title").notNull(), // contoh: "Ketua Umum", "Kepala Divisi Humas"
    appRole: text("app_role", { enum: APP_ROLES }).notNull().default("anggota"),
    ...timestamps,
  },
  (t) => [
    index("positions_member_idx").on(t.memberId),
    index("positions_period_idx").on(t.periodId, t.appRole),
  ],
);

export type MemberPosition = typeof memberPositions.$inferSelect;

export const membershipApplications = sqliteTable(
  "membership_applications",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: text("status", { enum: JOIN_STATUSES })
      .notNull()
      .default("menunggu"),
    reviewedBy: text("reviewed_by").references(() => users.id, {
      onDelete: "set null",
    }),
    note: text("note"),
    ...timestamps,
  },
  (t) => [index("join_apps_org_status_idx").on(t.orgId, t.status)],
);
