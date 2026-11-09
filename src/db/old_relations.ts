/**
 * Relasi Drizzle (RQB v2) untuk db.query.*
 *
 * Pemakaian:
 *   import { drizzle } from "drizzle-orm/libsql"; // atau better-sqlite3, sesuai driver Anda
 *   import { relations } from "./relations";
 *   const db = drizzle({ client, relations });
 *   await db.query.events.findMany({ with: { pic: true, registrations: true } });
 *
 * Catatan: tabel yang punya lebih dari satu relasi ke tabel yang sama
 * (users <-> organizationApplications, posts, membershipApplications)
 * memakai `alias` di kedua sisi agar tidak ambigu.
 */
import { defineRelations } from "drizzle-orm";
import * as schema from "./plan/schema";

export const relations = defineRelations(schema, (r) => ({
  /* ---------------- Platform & organisasi ---------------- */
  users: {
    sessions: r.many.sessions({ from: r.users.id, to: r.sessions.userId }),
    memberships: r.many.members({ from: r.users.id, to: r.members.userId }),
    createdOrganizations: r.many.organizations({
      from: r.users.id,
      to: r.organizations.createdBy,
    }),
    submittedApplications: r.many.organizationApplications({
      from: r.users.id,
      to: r.organizationApplications.applicantId,
      alias: "application_applicant",
    }),
    reviewedApplications: r.many.organizationApplications({
      from: r.users.id,
      to: r.organizationApplications.reviewedBy,
      alias: "application_reviewer",
    }),
    joinRequests: r.many.membershipApplications({
      from: r.users.id,
      to: r.membershipApplications.userId,
      alias: "join_applicant",
    }),
    reviewedJoinRequests: r.many.membershipApplications({
      from: r.users.id,
      to: r.membershipApplications.reviewedBy,
      alias: "join_reviewer",
    }),
    authoredPosts: r.many.posts({
      from: r.users.id,
      to: r.posts.authorId,
      alias: "post_author",
    }),
    reviewedPosts: r.many.posts({
      from: r.users.id,
      to: r.posts.reviewedBy,
      alias: "post_reviewer",
    }),
    uploadedDocuments: r.many.documents({
      from: r.users.id,
      to: r.documents.uploadedBy,
    }),
    notifications: r.many.notifications({
      from: r.users.id,
      to: r.notifications.userId,
    }),
  },
  sessions: {
    user: r.one.users({
      from: r.sessions.userId,
      to: r.users.id,
      optional: false,
    }),
  },
  organizations: {
    createdByUser: r.one.users({
      from: r.organizations.createdBy,
      to: r.users.id,
    }),
    applications: r.many.organizationApplications({
      from: r.organizations.id,
      to: r.organizationApplications.orgId,
    }),
    members: r.many.members({ from: r.organizations.id, to: r.members.orgId }),
    periods: r.many.periods({ from: r.organizations.id, to: r.periods.orgId }),
    divisions: r.many.divisions({
      from: r.organizations.id,
      to: r.divisions.orgId,
    }),
    events: r.many.events({ from: r.organizations.id, to: r.events.orgId }),
    documents: r.many.documents({
      from: r.organizations.id,
      to: r.documents.orgId,
    }),
    cashAccounts: r.many.cashAccounts({
      from: r.organizations.id,
      to: r.cashAccounts.orgId,
    }),
    transactions: r.many.transactions({
      from: r.organizations.id,
      to: r.transactions.orgId,
    }),
    assets: r.many.assets({ from: r.organizations.id, to: r.assets.orgId }),
    posts: r.many.posts({ from: r.organizations.id, to: r.posts.orgId }),
  },
  organizationApplications: {
    applicant: r.one.users({
      from: r.organizationApplications.applicantId,
      to: r.users.id,
      optional: false,
      alias: "application_applicant",
    }),
    reviewer: r.one.users({
      from: r.organizationApplications.reviewedBy,
      to: r.users.id,
      alias: "application_reviewer",
    }),
    organization: r.one.organizations({
      from: r.organizationApplications.orgId,
      to: r.organizations.id,
    }),
    files: r.many.applicationFiles({
      from: r.organizationApplications.id,
      to: r.applicationFiles.applicationId,
    }),
  },
  applicationFiles: {
    application: r.one.organizationApplications({
      from: r.applicationFiles.applicationId,
      to: r.organizationApplications.id,
      optional: false,
    }),
  },

  /* ---------------- Keanggotaan & kepengurusan ---------------- */
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
    dueBills: r.many.dueBills({ from: r.members.id, to: r.dueBills.memberId }),
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

  /* ---------------- Agenda & acara ---------------- */
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

  /* ---------------- Arsip dokumen ---------------- */
  documentCategories: {
    documents: r.many.documents({
      from: r.documentCategories.id,
      to: r.documents.categoryId,
    }),
  },
  documents: {
    organization: r.one.organizations({
      from: r.documents.orgId,
      to: r.organizations.id,
      optional: false,
    }),
    category: r.one.documentCategories({
      from: r.documents.categoryId,
      to: r.documentCategories.id,
    }),
    event: r.one.events({ from: r.documents.eventId, to: r.events.id }),
    uploader: r.one.users({ from: r.documents.uploadedBy, to: r.users.id }),
    versions: r.many.documentVersions({
      from: r.documents.id,
      to: r.documentVersions.documentId,
    }),
    // many-to-many lewat tabel penghubung document_tags
    tags: r.many.tags({
      from: r.documents.id.through(r.documentTags.documentId),
      to: r.tags.id.through(r.documentTags.tagId),
      alias: "document_tags",
    }),
  },
  documentVersions: {
    document: r.one.documents({
      from: r.documentVersions.documentId,
      to: r.documents.id,
      optional: false,
    }),
  },
  tags: {
    documents: r.many.documents({
      from: r.tags.id.through(r.documentTags.tagId),
      to: r.documents.id.through(r.documentTags.documentId),
      alias: "document_tags",
    }),
    posts: r.many.posts({
      from: r.tags.id.through(r.postTags.tagId),
      to: r.posts.id.through(r.postTags.postId),
      alias: "post_tags",
    }),
  },

  /* ---------------- Keuangan ---------------- */
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

  /* ---------------- Inventaris ---------------- */
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
    approver: r.one.users({ from: r.assetLoans.approvedBy, to: r.users.id }),
  },
  assetMaintenance: {
    asset: r.one.assets({
      from: r.assetMaintenance.assetId,
      to: r.assets.id,
      optional: false,
    }),
  },

  /* ---------------- Blog ---------------- */
  postCategories: {
    posts: r.many.posts({ from: r.postCategories.id, to: r.posts.categoryId }),
  },
  posts: {
    organization: r.one.organizations({
      from: r.posts.orgId,
      to: r.organizations.id,
      optional: false,
    }),
    author: r.one.users({
      from: r.posts.authorId,
      to: r.users.id,
      optional: false,
      alias: "post_author",
    }),
    reviewer: r.one.users({
      from: r.posts.reviewedBy,
      to: r.users.id,
      alias: "post_reviewer",
    }),
    category: r.one.postCategories({
      from: r.posts.categoryId,
      to: r.postCategories.id,
    }),
    comments: r.many.comments({ from: r.posts.id, to: r.comments.postId }),
    tags: r.many.tags({
      from: r.posts.id.through(r.postTags.postId),
      to: r.tags.id.through(r.postTags.tagId),
      alias: "post_tags",
    }),
  },
  comments: {
    post: r.one.posts({
      from: r.comments.postId,
      to: r.posts.id,
      optional: false,
    }),
  },

  /* ---------------- Notifikasi & audit ---------------- */
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
