/**
 * Relasi #9: Notifikasi & audit
 * Tabel yang relasinya didefinisikan di sini: notifications, auditLogs
 *
 * Aturan: tiap tabel punya relasinya di SATU file saja (sesuai file schema pemilik tabelnya),
 * karena index.ts menggabungkan semua bagian dengan spread object.
 */
import { defineRelationsPart } from "drizzle-orm";
import * as schema from "../schema";

export const notifikasiAuditRelations = defineRelationsPart(schema, (r) => ({
  notifications: {
    user: r.one.users({ from: r.notifications.userId, to: r.users.id }),
    member: r.one.members({ from: r.notifications.memberId, to: r.members.id }),
  },
  auditLogs: {
    organization: r.one.organizations({
      from: r.auditLogs.orgId,
      to: r.organizations.id,
    }),
    user: r.one.users({ from: r.auditLogs.userId, to: r.users.id }),
  },
}));
