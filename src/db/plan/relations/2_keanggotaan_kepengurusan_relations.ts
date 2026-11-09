/**
 * Relasi #2: Keanggotaan & kepengurusan
 * Tabel yang relasinya didefinisikan di sini: members, periods, divisions, memberPositions, membershipApplications
 *
 * Aturan: tiap tabel punya relasinya di SATU file saja (sesuai file schema pemilik tabelnya),
 * karena index.ts menggabungkan semua bagian dengan spread object.
 */
import { defineRelationsPart } from "drizzle-orm";
import * as schema from "../schema";

export const keanggotaanKepengurusanRelations = defineRelationsPart(
  schema,
  (r) => ({
    members: {
      organization: r.one.organizations({
        from: r.members.orgId,
        to: r.organizations.id,
        optional: false,
      }),
      user: r.one.users({
        from: r.members.userId,
        to: r.users.id,
        optional: false,
      }),
      positions: r.many.memberPositions({
        from: r.members.id,
        to: r.memberPositions.memberId,
      }),
      registrations: r.many.eventRegistrations({
        from: r.members.id,
        to: r.eventRegistrations.memberId,
      }),
      committeeRoles: r.many.eventCommittee({
        from: r.members.id,
        to: r.eventCommittee.memberId,
      }),
      dueBills: r.many.dueBills({
        from: r.members.id,
        to: r.dueBills.memberId,
      }),
      loans: r.many.assetLoans({
        from: r.members.id,
        to: r.assetLoans.borrowerId,
      }),
      picEvents: r.many.events({ from: r.members.id, to: r.events.picId }),
    },
    periods: {
      organization: r.one.organizations({
        from: r.periods.orgId,
        to: r.organizations.id,
        optional: false,
      }),
      positions: r.many.memberPositions({
        from: r.periods.id,
        to: r.memberPositions.periodId,
      }),
      dues: r.many.dues({ from: r.periods.id, to: r.dues.periodId }),
    },
    divisions: {
      organization: r.one.organizations({
        from: r.divisions.orgId,
        to: r.organizations.id,
        optional: false,
      }),
      positions: r.many.memberPositions({
        from: r.divisions.id,
        to: r.memberPositions.divisionId,
      }),
    },
    memberPositions: {
      member: r.one.members({
        from: r.memberPositions.memberId,
        to: r.members.id,
        optional: false,
      }),
      period: r.one.periods({
        from: r.memberPositions.periodId,
        to: r.periods.id,
        optional: false,
      }),
      division: r.one.divisions({
        from: r.memberPositions.divisionId,
        to: r.divisions.id,
      }),
    },
    membershipApplications: {
      organization: r.one.organizations({
        from: r.membershipApplications.orgId,
        to: r.organizations.id,
        optional: false,
      }),
      applicant: r.one.users({
        from: r.membershipApplications.userId,
        to: r.users.id,
        optional: false,
        alias: "join_applicant",
      }),
      reviewer: r.one.users({
        from: r.membershipApplications.reviewedBy,
        to: r.users.id,
        alias: "join_reviewer",
      }),
    },
  }),
);
