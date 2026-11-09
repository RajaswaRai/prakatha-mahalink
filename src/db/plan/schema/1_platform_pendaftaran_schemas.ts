/**
 * Migrasi #1: Platform & pendaftaran organisasi
 *
 * Tabel: users, sessions, organizations, organization_applications, application_files
 * Bergantung pada: tidak ada
 */
import {
  index,
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { pk, ts, timestamps } from "./_common";

/* Nilai enum (dipakai juga di validasi form / Zod) */
export const PLATFORM_ROLES = ["mahasiswa", "dosen", "admin"] as const;
export const USER_STATUSES = ["menunggu", "aktif", "nonaktif"] as const;
export const ORG_TYPES = ["ukm", "himpunan", "bem", "lainnya"] as const;
export const ORG_SCOPES = ["universitas", "fakultas"] as const;
export const ORG_STATUSES = ["aktif", "dibekukan", "nonaktif"] as const;
export const APPLICATION_TYPES = ["baru", "pembaruan"] as const;
export const APPLICATION_STATUSES = [
  "diajukan",
  "revisi",
  "disetujui",
  "ditolak",
] as const;
export const APPLICATION_FILE_KINDS = [
  "sk",
  "ad_art",
  "daftar_pengurus",
  "lainnya",
] as const;

export const users = sqliteTable(
  "users",
  {
    id: pk(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash"),
    googleId: text("google_id").unique(),
    name: text("name").notNull(),
    nim: text("nim").unique(),
    studyProgram: text("study_program"),
    cohortYear: integer("cohort_year"),
    phone: text("phone"),
    waOptInAt: ts("wa_opt_in_at"),
    platformRole: text("platform_role", { enum: PLATFORM_ROLES })
      .notNull(),
    status: text("status", { enum: USER_STATUSES })
      .notNull()
      .default("menunggu"),
    ...timestamps,
  },
  (t) => [
    index("users_status_idx").on(t.status),
    index("users_role_idx").on(t.platformRole),
  ],
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const sessions = sqliteTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    orgId: text("org_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    expiresAt: ts("expires_at").notNull(),
  },
  (t) => [index("sessions_user_idx").on(t.userId)],
);

export const organizations = sqliteTable(
  "organizations",
  {
    id: pk(),
    code: text("code").notNull().unique(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    type: text("type", { enum: ORG_TYPES }).notNull().default("ukm"),
    scope: text("scope", { enum: ORG_SCOPES }).notNull().default("universitas"),
    faculty: text("faculty"),
    description: text("description"),
    advisorName: text("advisor_name"),
    skNumber: text("sk_number"),
    logoKey: text("logo_key"),
    contactEmail: text("contact_email"),
    status: text("status", { enum: ORG_STATUSES }).notNull().default("aktif"),
    verifiedAt: ts("verified_at"),
    createdBy: text("created_by").references(() => users.id, {
      onDelete: "set null",
    }),
    ...timestamps,
  },
  (t) => [index("orgs_status_idx").on(t.status)],
);

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;

export const organizationApplications = sqliteTable(
  "organization_applications",
  {
    id: pk(),
    applicantId: text("applicant_id")
      .notNull()
      .references(() => users.id),
    // null untuk pengajuan organisasi baru; terisi untuk pembaruan organisasi yang ada
    orgId: text("org_id").references(() => organizations.id, {
      onDelete: "set null",
    }),
    type: text("type", { enum: APPLICATION_TYPES }).notNull(),
    proposedData: text("proposed_data", { mode: "json" }).$type<
      Record<string, unknown>
    >(),
    status: text("status", { enum: APPLICATION_STATUSES })
      .notNull()
      .default("diajukan"),
    reviewedBy: text("reviewed_by").references(() => users.id, {
      onDelete: "set null",
    }),
    reviewNote: text("review_note"),
    reviewedAt: ts("reviewed_at"),
    ...timestamps,
  },
  (t) => [
    index("org_apps_status_idx").on(t.status),
    index("org_apps_applicant_idx").on(t.applicantId),
  ],
);

export const applicationFiles = sqliteTable(
  "application_files",
  {
    id: pk(),
    applicationId: text("application_id")
      .notNull()
      .references(() => organizationApplications.id, { onDelete: "cascade" }),
    kind: text("kind", { enum: APPLICATION_FILE_KINDS })
      .notNull()
      .default("lainnya"),
    fileKey: text("file_key").notNull(),
    fileName: text("file_name").notNull(),
    ...timestamps,
  },
  (t) => [index("app_files_app_idx").on(t.applicationId)],
);
