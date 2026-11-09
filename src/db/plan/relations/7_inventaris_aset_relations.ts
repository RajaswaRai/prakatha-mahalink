/**
 * Relasi #7: Inventaris aset
 * Tabel yang relasinya didefinisikan di sini: assetCategories, assets, assetLoans, assetMaintenance
 *
 * Aturan: tiap tabel punya relasinya di SATU file saja (sesuai file schema pemilik tabelnya),
 * karena index.ts menggabungkan semua bagian dengan spread object.
 */
import { defineRelationsPart } from "drizzle-orm";
import * as schema from "../schema";

export const inventarisAsetRelations = defineRelationsPart(schema, (r) => ({
  assetCategories: {
    assets: r.many.assets({
      from: r.assetCategories.id,
      to: r.assets.categoryId,
    }),
  },
  assets: {
    organization: r.one.organizations({
      from: r.assets.orgId,
      to: r.organizations.id,
      optional: false,
    }),
    category: r.one.assetCategories({
      from: r.assets.categoryId,
      to: r.assetCategories.id,
    }),
    loans: r.many.assetLoans({ from: r.assets.id, to: r.assetLoans.assetId }),
    maintenance: r.many.assetMaintenance({
      from: r.assets.id,
      to: r.assetMaintenance.assetId,
    }),
  },
  assetLoans: {
    asset: r.one.assets({
      from: r.assetLoans.assetId,
      to: r.assets.id,
      optional: false,
    }),
    borrower: r.one.members({
      from: r.assetLoans.borrowerId,
      to: r.members.id,
      optional: false,
    }),
    event: r.one.events({ from: r.assetLoans.eventId, to: r.events.id }),
    letter: r.one.letters({
      from: r.assetLoans.letterId,
      to: r.letters.id,
    }),
    borrowerOrganization: r.one.organizations({
      from: r.assetLoans.borrowerOrgId,
      to: r.organizations.id,
    }),
    approver: r.one.users({ from: r.assetLoans.approvedBy, to: r.users.id }),
  },
  assetMaintenance: {
    asset: r.one.assets({
      from: r.assetMaintenance.assetId,
      to: r.assets.id,
      optional: false,
    }),
  },
}));
