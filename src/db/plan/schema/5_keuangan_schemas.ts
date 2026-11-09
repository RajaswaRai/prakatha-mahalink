/**
 * Migrasi #5: Keuangan: kas, iuran, anggaran
 *
 * Tabel: cash_accounts, transaction_categories, transactions, dues, due_bills, due_payments, budget_items
 * Bergantung pada: 1_platform_pendaftaran_schemas, 2_keanggotaan_kepengurusan_schemas, 3_agenda_acara_schemas
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
import { members, periods } from "./2_keanggotaan_kepengurusan_schemas";
import { events } from "./3_agenda_acara_schemas";

/* Nilai enum (dipakai juga di validasi form / Zod) */
export const FLOW_TYPES = ["masuk", "keluar"] as const;
export const TRX_STATUSES = ["posted", "void"] as const;
export const BILL_STATUSES = ["belum", "sebagian", "lunas"] as const;
export const PAYMENT_STATUSES = [
  "pending",
  "terverifikasi",
  "ditolak",
] as const;

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

export type Transaction = typeof transactions.$inferSelect;

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

export type DueBill = typeof dueBills.$inferSelect;

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
