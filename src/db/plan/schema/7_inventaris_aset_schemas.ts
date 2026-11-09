/**
 * Migrasi #7: Inventaris aset
 *
 * Tabel: asset_categories, assets, asset_loans, asset_maintenance
 * Bergantung pada: 1_platform_pendaftaran_schemas, 2_keanggotaan_kepengurusan_schemas, 3_agenda_acara_schemas, 6_surat_antar_organisasi_schemas
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
import { members } from "./2_keanggotaan_kepengurusan_schemas";
import { events } from "./3_agenda_acara_schemas";
import { letters } from "./6_surat_antar_organisasi_schemas";

/* Nilai enum (dipakai juga di validasi form / Zod) */
export const ASSET_CONDITIONS = [
  "baik",
  "rusak_ringan",
  "rusak_berat",
] as const;
export const ASSET_STATUSES = [
  "tersedia",
  "dipinjam",
  "rusak",
  "hilang",
] as const;
export const LOAN_STATUSES = [
  "diajukan",
  "disetujui",
  "dipinjam",
  "kembali",
  "ditolak",
] as const;

export const assetCategories = sqliteTable(
  "asset_categories",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    ...timestamps,
  },
  (t) => [index("asset_cat_org_idx").on(t.orgId)],
);

export const assets = sqliteTable(
  "assets",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    categoryId: text("category_id").references(() => assetCategories.id, {
      onDelete: "set null",
    }),
    code: text("code").notNull(),
    name: text("name").notNull(),
    quantity: integer("quantity").notNull().default(1),
    condition: text("condition", { enum: ASSET_CONDITIONS })
      .notNull()
      .default("baik"),
    status: text("status", { enum: ASSET_STATUSES })
      .notNull()
      .default("tersedia"),
    location: text("location"),
    photoKey: text("photo_key"),
    isLendable: integer("is_lendable", { mode: "boolean" })
      .notNull()
      .default(false),
    acquiredAt: ts("acquired_at"),
    acquiredValue: integer("acquired_value"),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("assets_org_code_uq").on(t.orgId, t.code),
    index("assets_org_status_idx").on(t.orgId, t.status),
  ],
);

export type Asset = typeof assets.$inferSelect;

export const assetLoans = sqliteTable(
  "asset_loans",
  {
    id: pk(),
    assetId: text("asset_id")
      .notNull()
      .references(() => assets.id, { onDelete: "cascade" }),
    letterId: text("letter_id").references(() => letters.id, {
      onDelete: "set null",
    }),
    borrowerOrgId: text("borrower_org_id").references(
      () => organizations.id,
      { onDelete: "restrict" },
    ),
    borrowerId: text("borrower_id")
      .notNull()
      .references(() => members.id),
    eventId: text("event_id").references(() => events.id, {
      onDelete: "set null",
    }),
    qty: integer("qty").notNull().default(1),
    loanDate: ts("loan_date").notNull(),
    dueDate: ts("due_date"),
    returnedAt: ts("returned_at"),
    status: text("status", { enum: LOAN_STATUSES })
      .notNull()
      .default("diajukan"),
    approvedBy: text("approved_by").references(() => users.id, {
      onDelete: "set null",
    }),
    decisionNote: text("decision_note"),
    returnedCondition: text("returned_condition", {
      enum: ASSET_CONDITIONS,
    }),
    returnNote: text("return_note"),
    ...timestamps,
  },
  (t) => [
    index("loans_asset_idx").on(t.assetId, t.status),
    index("loans_borrower_idx").on(t.borrowerId),
    index("loans_due_idx").on(t.status, t.dueDate),
  ],
);

export const assetMaintenance = sqliteTable(
  "asset_maintenance",
  {
    id: pk(),
    assetId: text("asset_id")
      .notNull()
      .references(() => assets.id, { onDelete: "cascade" }),
    maintDate: ts("maint_date").notNull(),
    note: text("note"),
    cost: integer("cost").notNull().default(0),
    ...timestamps,
  },
  (t) => [index("maint_asset_idx").on(t.assetId)],
);
