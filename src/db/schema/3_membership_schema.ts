import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { pk, ts, timestamps } from "./_common";
import { users } from "./1_user_schema";
import { organizations } from "./2_organization_schema";

/* Nilai enum (dipakai juga di validasi form / Zod) */
export const MEMBER_STATUSES = ["active", "inactive", "graduate"] as const;
export const APP_ROLES = [
  "president",
  "secretary",
  "treasurer",
  "inventory",
  "member",
  "advisor",
] as const;
export const JOIN_STATUSES = ["pending", "approved", "disapproved"] as const;

/* Daftar izin (permissions) yang tersedia dalam sistem */
export const PERMISSIONS = [
  "org:update", // Mengubah profil organisasi
  "members:manage", // Menambah/mengubah/menghapus anggota
  "finances:manage", // Mengelola keuangan / kas
  "inventory:manage", // Mengelola inventaris barang
  "periods:manage", // Mengelola periode kepengurusan & divisi
  "applications:review", // Menyetujui pendaftaran anggota baru
] as const;

export type Permission = (typeof PERMISSIONS)[number];

// ORG MEMBERS TABLE
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
      .default("active"),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("members_org_user_uq").on(t.orgId, t.userId),
    index("members_org_status_idx").on(t.orgId, t.status),
  ],
);

export type Member = typeof members.$inferSelect;

// ORG PERIODS TABLE
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

// ORG DIVISIONS TABLE
export const divisions = sqliteTable(
  "divisions",
  {
    id: pk(),
    orgId: text("org_id").references(() => organizations.id, {
      onDelete: "cascade",
    }),
    name: text("name").notNull(),
    ...timestamps,
  },
  (t) => [index("divisions_org_idx").on(t.orgId)],
);

// ORG MEMBER POSITIONS TABLE (Harus diletakkan sebelum position_permissions)
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
    appRole: text("app_role", { enum: APP_ROLES }).notNull().default("member"),
    ...timestamps,
  },
  (t) => [
    index("positions_member_idx").on(t.memberId),
    index("positions_period_idx").on(t.periodId, t.appRole),
  ],
);

export type MemberPosition = typeof memberPositions.$inferSelect;

// POSITION PERMISSIONS TABLE (Relasi ke memberPositions)
export const positionPermissions = sqliteTable(
  "position_permissions",
  {
    id: pk(),
    positionId: text("position_id")
      .notNull()
      .references(() => memberPositions.id, { onDelete: "cascade" }),
    permission: text("permission", { enum: PERMISSIONS }).notNull(),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("pos_perm_uq").on(t.positionId, t.permission),
    index("pos_perm_position_idx").on(t.positionId),
  ],
);

export type PositionPermission = typeof positionPermissions.$inferSelect;
export type NewPositionPermission = typeof positionPermissions.$inferInsert;

// MEMBERSHIP APPLICATIONS TABLE
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
      .default("pending"),
    reviewedBy: text("reviewed_by"),
    note: text("note"),
    ...timestamps,
  },
  (t) => [index("join_apps_org_status_idx").on(t.orgId, t.status)],
);
