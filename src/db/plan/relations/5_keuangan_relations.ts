/**
 * Relasi #5: Keuangan: kas, iuran, anggaran
 * Tabel yang relasinya didefinisikan di sini: cashAccounts, transactionCategories, transactions, dues, dueBills, duePayments, budgetItems
 *
 * Aturan: tiap tabel punya relasinya di SATU file saja (sesuai file schema pemilik tabelnya),
 * karena index.ts menggabungkan semua bagian dengan spread object.
 */
import { defineRelationsPart } from "drizzle-orm";
import * as schema from "../schema";

export const keuanganRelations = defineRelationsPart(schema, (r) => ({
  cashAccounts: {
    transactions: r.many.transactions({
      from: r.cashAccounts.id,
      to: r.transactions.accountId,
    }),
  },
  transactionCategories: {
    transactions: r.many.transactions({
      from: r.transactionCategories.id,
      to: r.transactions.categoryId,
    }),
  },
  transactions: {
    organization: r.one.organizations({
      from: r.transactions.orgId,
      to: r.organizations.id,
      optional: false,
    }),
    account: r.one.cashAccounts({
      from: r.transactions.accountId,
      to: r.cashAccounts.id,
      optional: false,
    }),
    category: r.one.transactionCategories({
      from: r.transactions.categoryId,
      to: r.transactionCategories.id,
    }),
    event: r.one.events({ from: r.transactions.eventId, to: r.events.id }),
    creator: r.one.users({ from: r.transactions.createdBy, to: r.users.id }),
  },
  dues: {
    period: r.one.periods({ from: r.dues.periodId, to: r.periods.id }),
    bills: r.many.dueBills({ from: r.dues.id, to: r.dueBills.dueId }),
  },
  dueBills: {
    due: r.one.dues({ from: r.dueBills.dueId, to: r.dues.id, optional: false }),
    member: r.one.members({
      from: r.dueBills.memberId,
      to: r.members.id,
      optional: false,
    }),
    payments: r.many.duePayments({
      from: r.dueBills.id,
      to: r.duePayments.billId,
    }),
  },
  duePayments: {
    bill: r.one.dueBills({
      from: r.duePayments.billId,
      to: r.dueBills.id,
      optional: false,
    }),
    transaction: r.one.transactions({
      from: r.duePayments.transactionId,
      to: r.transactions.id,
    }),
    verifier: r.one.users({ from: r.duePayments.verifiedBy, to: r.users.id }),
  },
  budgetItems: {
    event: r.one.events({
      from: r.budgetItems.eventId,
      to: r.events.id,
      optional: false,
    }),
  },
}));
