/**
 * Schema database: Platform Pusat Kemahasiswaan (multi-organisasi)
 * Stack: Next.js + Drizzle ORM + SQLite
 *
 * Konvensi:
 * - ID: text (cuid2), bukan autoincrement
 * - Waktu: integer mode "timestamp" (detik sejak epoch)
 * - Uang: integer dalam rupiah (tanpa desimal)
 * - Enum: text dengan { enum: [...] } (SQLite tidak punya tipe enum)
 * - Setiap data operasional membawa orgId (isolasi antar organisasi dijaga di lapisan akses data)
 * - Aktifkan PRAGMA foreign_keys = ON dan journal_mode = WAL saat membuka koneksi
 *
 * Dependensi: drizzle-orm (v1 / RQB v2), @paralleldrive/cuid2
 * Relasi untuk db.query ada di file terpisah: relations.ts (defineRelations)
 */
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

/* ------------------------------------------------------------------ */
/* Helper                                                              */
/* ------------------------------------------------------------------ */

const pk = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => createId());

const ts = (name: string) => integer(name, { mode: "timestamp" });

const timestamps = {
  createdAt: ts("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: ts("updated_at")
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdateFn(() => new Date()),
  deletedAt: ts("deleted_at"),
};

/* ------------------------------------------------------------------ */
/* Nilai enum (dipakai juga di validasi form / Zod)                    */
/* ------------------------------------------------------------------ */

export const PLATFORM_ROLES = ["super_admin", "staf_pk", "mahasiswa"] as const;
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
export const MEMBER_STATUSES = ["aktif", "nonaktif", "alumni"] as const;
export const APP_ROLES = [
  "ketua",
  "sekretaris",
  "bendahara",
  "staf_inventaris",
  "anggota",
] as const;
export const JOIN_STATUSES = ["menunggu", "disetujui", "ditolak"] as const;
export const VISIBILITIES = ["privat", "internal", "publik"] as const;
export const EVENT_VISIBILITIES = ["internal", "publik"] as const;
export const EVENT_STATUSES = [
  "rencana",
  "berlangsung",
  "selesai",
  "batal",
] as const;
export const RSVP_VALUES = ["hadir", "tidak", "ragu"] as const;
export const CHECKIN_METHODS = ["qr", "manual"] as const;
export const FLOW_TYPES = ["masuk", "keluar"] as const;
export const TRX_STATUSES = ["posted", "void"] as const;
export const BILL_STATUSES = ["belum", "sebagian", "lunas"] as const;
export const PAYMENT_STATUSES = [
  "pending",
  "terverifikasi",
  "ditolak",
] as const;
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
export const POST_STATUSES = [
  "draft",
  "review",
  "terjadwal",
  "terbit",
] as const;
export const COMMENT_STATUSES = ["menunggu", "disetujui", "spam"] as const;
export const NOTIF_CHANNELS = ["inapp", "email", "whatsapp"] as const;
export const NOTIF_STATUSES = ["antri", "terkirim", "gagal"] as const;

/* ================================================================== */
/* 1. PLATFORM & PENDAFTARAN ORGANISASI                                */
/* ================================================================== */

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
      .notNull()
      .default("mahasiswa"),
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

export const sessions = sqliteTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
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

/* ================================================================== */
/* 2. KEANGGOTAAN & KEPENGURUSAN                                       */
/* ================================================================== */

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

/* ================================================================== */
/* 3. AGENDA & ACARA (dideklarasikan sebelum modul yang merujuknya)    */
/* ================================================================== */

export const events = sqliteTable(
  "events",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    picId: text("pic_id").references(() => members.id, {
      onDelete: "set null",
    }),
    title: text("title").notNull(),
    description: text("description"),
    startAt: ts("start_at").notNull(),
    endAt: ts("end_at"),
    location: text("location"),
    visibility: text("visibility", { enum: EVENT_VISIBILITIES })
      .notNull()
      .default("internal"),
    status: text("status", { enum: EVENT_STATUSES })
      .notNull()
      .default("rencana"),
    ...timestamps,
  },
  (t) => [
    index("events_org_start_idx").on(t.orgId, t.startAt),
    index("events_visibility_idx").on(t.visibility),
  ],
);

export const eventRegistrations = sqliteTable(
  "event_registrations",
  {
    id: pk(),
    eventId: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    memberId: text("member_id")
      .notNull()
      .references(() => members.id, { onDelete: "cascade" }),
    rsvp: text("rsvp", { enum: RSVP_VALUES }),
    attendedAt: ts("attended_at"),
    checkinMethod: text("checkin_method", { enum: CHECKIN_METHODS }),
    ...timestamps,
  },
  (t) => [uniqueIndex("event_reg_uq").on(t.eventId, t.memberId)],
);

export const eventCommittee = sqliteTable(
  "event_committee",
  {
    id: pk(),
    eventId: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    memberId: text("member_id")
      .notNull()
      .references(() => members.id, { onDelete: "cascade" }),
    role: text("role").notNull(),
    task: text("task"),
    ...timestamps,
  },
  (t) => [index("committee_event_idx").on(t.eventId)],
);

/* ================================================================== */
/* 4. ARSIP DOKUMEN                                                    */
/* ================================================================== */

export const tags = sqliteTable(
  "tags",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
  },
  (t) => [uniqueIndex("tags_org_name_uq").on(t.orgId, t.name)],
);

export const documentCategories = sqliteTable(
  "document_categories",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    ...timestamps,
  },
  (t) => [index("doc_cat_org_idx").on(t.orgId)],
);

export const documents = sqliteTable(
  "documents",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    categoryId: text("category_id").references(() => documentCategories.id, {
      onDelete: "set null",
    }),
    eventId: text("event_id").references(() => events.id, {
      onDelete: "set null",
    }),
    title: text("title").notNull(),
    fileKey: text("file_key").notNull(),
    mimeType: text("mime_type"),
    sizeBytes: integer("size_bytes"),
    visibility: text("visibility", { enum: VISIBILITIES })
      .notNull()
      .default("internal"),
    letterNumber: text("letter_number"),
    uploadedBy: text("uploaded_by").references(() => users.id, {
      onDelete: "set null",
    }),
    currentVersion: integer("current_version").notNull().default(1),
    ...timestamps,
  },
  (t) => [
    index("docs_org_cat_idx").on(t.orgId, t.categoryId),
    index("docs_org_created_idx").on(t.orgId, t.createdAt),
    index("docs_event_idx").on(t.eventId),
  ],
);

export const documentVersions = sqliteTable(
  "document_versions",
  {
    id: pk(),
    documentId: text("document_id")
      .notNull()
      .references(() => documents.id, { onDelete: "cascade" }),
    versionNo: integer("version_no").notNull(),
    fileKey: text("file_key").notNull(),
    uploadedBy: text("uploaded_by").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: ts("created_at")
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [uniqueIndex("doc_versions_uq").on(t.documentId, t.versionNo)],
);

export const documentTags = sqliteTable(
  "document_tags",
  {
    documentId: text("document_id")
      .notNull()
      .references(() => documents.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.documentId, t.tagId] })],
);

export const letterSequences = sqliteTable(
  "letter_sequences",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    year: integer("year").notNull(),
    lastNumber: integer("last_number").notNull().default(0),
  },
  (t) => [uniqueIndex("letter_seq_uq").on(t.orgId, t.year)],
);

/* ================================================================== */
/* 5. KEUANGAN: KAS, IURAN, ANGGARAN                                   */
/* ================================================================== */

export const cashAccounts = sqliteTable(
  "cash_accounts",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    openingBalance: integer("opening_balance").notNull().default(0),
    ...timestamps,
  },
  (t) => [index("cash_acc_org_idx").on(t.orgId)],
);

export const transactionCategories = sqliteTable(
  "transaction_categories",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    type: text("type", { enum: FLOW_TYPES }).notNull(),
    ...timestamps,
  },
  (t) => [index("trx_cat_org_idx").on(t.orgId)],
);

export const transactions = sqliteTable(
  "transactions",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    accountId: text("account_id")
      .notNull()
      .references(() => cashAccounts.id),
    categoryId: text("category_id").references(() => transactionCategories.id, {
      onDelete: "set null",
    }),
    eventId: text("event_id").references(() => events.id, {
      onDelete: "set null",
    }),
    type: text("type", { enum: FLOW_TYPES }).notNull(),
    amount: integer("amount").notNull(), // rupiah, selalu positif; arah ditentukan oleh `type`
    trxDate: ts("trx_date").notNull(),
    description: text("description"),
    receiptKey: text("receipt_key"),
    // Transaksi tidak dihapus: dibatalkan dengan status "void" + alasan
    status: text("status", { enum: TRX_STATUSES }).notNull().default("posted"),
    voidReason: text("void_reason"),
    createdBy: text("created_by").references(() => users.id, {
      onDelete: "set null",
    }),
    ...timestamps,
  },
  (t) => [
    index("trx_org_date_idx").on(t.orgId, t.trxDate),
    index("trx_account_idx").on(t.accountId),
    index("trx_event_idx").on(t.eventId),
  ],
);

export const dues = sqliteTable(
  "dues",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    periodId: text("period_id").references(() => periods.id, {
      onDelete: "set null",
    }),
    name: text("name").notNull(), // contoh: "Iuran Oktober 2026"
    amount: integer("amount").notNull(),
    dueDate: ts("due_date"),
    ...timestamps,
  },
  (t) => [index("dues_org_idx").on(t.orgId)],
);

export const dueBills = sqliteTable(
  "due_bills",
  {
    id: pk(),
    dueId: text("due_id")
      .notNull()
      .references(() => dues.id, { onDelete: "cascade" }),
    memberId: text("member_id")
      .notNull()
      .references(() => members.id, { onDelete: "cascade" }),
    amountDue: integer("amount_due").notNull(),
    status: text("status", { enum: BILL_STATUSES }).notNull().default("belum"),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("due_bills_uq").on(t.dueId, t.memberId),
    index("due_bills_member_idx").on(t.memberId, t.status),
  ],
);

export const duePayments = sqliteTable(
  "due_payments",
  {
    id: pk(),
    billId: text("bill_id")
      .notNull()
      .references(() => dueBills.id, { onDelete: "cascade" }),
    // terisi otomatis saat pembayaran diverifikasi
    transactionId: text("transaction_id").references(() => transactions.id, {
      onDelete: "set null",
    }),
    amount: integer("amount").notNull(),
    paidAt: ts("paid_at"),
    proofKey: text("proof_key"),
    status: text("status", { enum: PAYMENT_STATUSES })
      .notNull()
      .default("pending"),
    verifiedBy: text("verified_by").references(() => users.id, {
      onDelete: "set null",
    }),
    ...timestamps,
  },
  (t) => [
    index("due_pay_bill_idx").on(t.billId),
    index("due_pay_status_idx").on(t.status),
  ],
);

export const budgetItems = sqliteTable(
  "budget_items",
  {
    id: pk(),
    eventId: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    qty: integer("qty").notNull().default(1),
    unitPrice: integer("unit_price").notNull().default(0),
    actualAmount: integer("actual_amount").notNull().default(0),
    ...timestamps,
  },
  (t) => [index("budget_event_idx").on(t.eventId)],
);

/* ================================================================== */
/* 6. INVENTARIS ASET                                                  */
/* ================================================================== */

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
    acquiredAt: ts("acquired_at"),
    acquiredValue: integer("acquired_value"),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("assets_org_code_uq").on(t.orgId, t.code),
    index("assets_org_status_idx").on(t.orgId, t.status),
  ],
);

export const assetLoans = sqliteTable(
  "asset_loans",
  {
    id: pk(),
    assetId: text("asset_id")
      .notNull()
      .references(() => assets.id, { onDelete: "cascade" }),
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
    ...timestamps,
  },
  (t) => [
    index("loans_asset_idx").on(t.assetId, t.status),
    index("loans_borrower_idx").on(t.borrowerId),
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

/* ================================================================== */
/* 7. BLOG                                                             */
/* ================================================================== */

export const postCategories = sqliteTable(
  "post_categories",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    ...timestamps,
  },
  (t) => [uniqueIndex("post_cat_org_slug_uq").on(t.orgId, t.slug)],
);

export const posts = sqliteTable(
  "posts",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    authorId: text("author_id")
      .notNull()
      .references(() => users.id),
    categoryId: text("category_id").references(() => postCategories.id, {
      onDelete: "set null",
    }),
    reviewedBy: text("reviewed_by").references(() => users.id, {
      onDelete: "set null",
    }),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull().default(""),
    coverKey: text("cover_key"),
    status: text("status", { enum: POST_STATUSES }).notNull().default("draft"),
    scheduledAt: ts("scheduled_at"),
    publishedAt: ts("published_at"),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("posts_org_slug_uq").on(t.orgId, t.slug),
    index("posts_status_pub_idx").on(t.status, t.publishedAt),
  ],
);

export const postTags = sqliteTable(
  "post_tags",
  {
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.postId, t.tagId] })],
);

export const comments = sqliteTable(
  "comments",
  {
    id: pk(),
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    body: text("body").notNull(),
    status: text("status", { enum: COMMENT_STATUSES })
      .notNull()
      .default("menunggu"),
    ...timestamps,
  },
  (t) => [index("comments_post_status_idx").on(t.postId, t.status)],
);

/* ================================================================== */
/* 8. NOTIFIKASI & AUDIT                                               */
/* ================================================================== */

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

/* ================================================================== */
/* TIPE TURUNAN                                                        */
/* ================================================================== */

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
export type OrganizationApplication =
  typeof organizationApplications.$inferSelect;
export type Member = typeof members.$inferSelect;
export type MemberPosition = typeof memberPositions.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Document = typeof documents.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type DueBill = typeof dueBills.$inferSelect;
export type Asset = typeof assets.$inferSelect;
export type Post = typeof posts.$inferSelect;
