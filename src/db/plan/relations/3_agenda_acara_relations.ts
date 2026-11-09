/**
 * Relasi #3: Agenda & acara
 * Tabel yang relasinya didefinisikan di sini: events, eventRegistrations, eventCommittee
 *
 * Aturan: tiap tabel punya relasinya di SATU file saja (sesuai file schema pemilik tabelnya),
 * karena index.ts menggabungkan semua bagian dengan spread object.
 */
import { defineRelationsPart } from "drizzle-orm";
import * as schema from "../schema";

export const agendaAcaraRelations = defineRelationsPart(schema, (r) => ({
  events: {
    organization: r.one.organizations({
      from: r.events.orgId,
      to: r.organizations.id,
      optional: false,
    }),
    pic: r.one.members({ from: r.events.picId, to: r.members.id }),
    registrations: r.many.eventRegistrations({
      from: r.events.id,
      to: r.eventRegistrations.eventId,
    }),
    committee: r.many.eventCommittee({
      from: r.events.id,
      to: r.eventCommittee.eventId,
    }),
    budgetItems: r.many.budgetItems({
      from: r.events.id,
      to: r.budgetItems.eventId,
    }),
    documents: r.many.documents({ from: r.events.id, to: r.documents.eventId }),
    transactions: r.many.transactions({
      from: r.events.id,
      to: r.transactions.eventId,
    }),
    assetLoans: r.many.assetLoans({
      from: r.events.id,
      to: r.assetLoans.eventId,
    }),
  },
  eventRegistrations: {
    event: r.one.events({
      from: r.eventRegistrations.eventId,
      to: r.events.id,
      optional: false,
    }),
    member: r.one.members({
      from: r.eventRegistrations.memberId,
      to: r.members.id,
      optional: false,
    }),
  },
  eventCommittee: {
    event: r.one.events({
      from: r.eventCommittee.eventId,
      to: r.events.id,
      optional: false,
    }),
    member: r.one.members({
      from: r.eventCommittee.memberId,
      to: r.members.id,
      optional: false,
    }),
  },
}));
