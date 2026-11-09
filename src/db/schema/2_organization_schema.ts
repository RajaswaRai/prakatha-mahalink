import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { pk, ts, timestamps } from "./_common";
import { users } from "./1_user_schema";

/* Nilai enum (dipakai juga di validasi form / Zod) */
export const ORG_TYPES = ["ukm", "himpunan", "bem", "others"] as const;
export const ORG_STATUSES = ["active", "inactive"] as const;

export const APPLICATION_TYPES = ["baru", "pembaruan"] as const;
export const APPLICATION_STATUSES = [
  "on review",
  "approved",
  "Disapproved",
] as const;
export const APPLICATION_FILE_KINDS = [
  "sk",
  "ad_art",
  "daftar_pengurus",
  "others",
] as const;

// ORGANIZATION TABLE
export const organizations = sqliteTable(
  "organizations",
  {
    id: pk(),
    code: text("code").notNull().unique(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    type: text("type", { enum: ORG_TYPES }).notNull().default("ukm"),
    faculty: text("faculty"),
    description: text("description"),
    advisor_user_id: text("advisor_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    logoKey: text("logo_key"),
    status: text("status", { enum: ORG_STATUSES })
      .notNull()
      .default("inactive"),
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

// ORGANIZATION APPLICATION TABLE
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
      .default("on review"),
    reviewedBy: text("reviewed_by"),
    reviewNote: text("review_note"),
    reviewedAt: ts("reviewed_at"),
    ...timestamps,
  },
  (t) => [
    index("org_apps_status_idx").on(t.status),
    index("org_apps_applicant_idx").on(t.applicantId),
  ],
);

// ORGANIZATION APPLICATION FILES TABLE
export const applicationFiles = sqliteTable(
  "application_files",
  {
    id: pk(),
    applicationId: text("application_id")
      .notNull()
      .references(() => organizationApplications.id, { onDelete: "cascade" }),
    kind: text("kind", { enum: APPLICATION_FILE_KINDS })
      .notNull()
      .default("others"),
    // fileKey: text("file_key").notNull(),
    fileName: text("file_name").notNull(),
    ...timestamps,
  },
  (t) => [index("app_files_app_idx").on(t.applicationId)],
);
