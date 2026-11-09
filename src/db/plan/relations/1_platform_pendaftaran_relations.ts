/**
 * Relasi #1: Platform & pendaftaran organisasi
 * Tabel yang relasinya didefinisikan di sini: users, sessions, organizations, organizationApplications, applicationFiles
 *
 * Aturan: tiap tabel punya relasinya di SATU file saja (sesuai file schema pemilik tabelnya),
 * karena index.ts menggabungkan semua bagian dengan spread object.
 */
import { defineRelationsPart } from "drizzle-orm";
import * as schema from "../schema";

export const platformPendaftaranRelations = defineRelationsPart(
  schema,
  (r) => ({
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
      createdLetters: r.many.letters({
        from: r.users.id,
        to: r.letters.createdBy,
        alias: "letter_creator",
      }),
      sentLetters: r.many.letters({
        from: r.users.id,
        to: r.letters.sentBy,
        alias: "letter_sender_user",
      }),
      readLetters: r.many.letters({
        from: r.users.id,
        to: r.letters.readBy,
        alias: "letter_reader",
      }),
    },
    sessions: {
      user: r.one.users({
        from: r.sessions.userId,
        to: r.users.id,
        optional: false,
      }),
      activeOrganization: r.one.organizations({
        from: r.sessions.orgId,
        to: r.organizations.id,
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
      members: r.many.members({
        from: r.organizations.id,
        to: r.members.orgId,
      }),
      periods: r.many.periods({
        from: r.organizations.id,
        to: r.periods.orgId,
      }),
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
      activeSessions: r.many.sessions({
        from: r.organizations.id,
        to: r.sessions.orgId,
      }),
      outgoingLetters: r.many.letters({
        from: r.organizations.id,
        to: r.letters.fromOrgId,
        alias: "letter_sender",
      }),
      incomingLetters: r.many.letters({
        from: r.organizations.id,
        to: r.letters.toOrgId,
        alias: "letter_recipient",
      }),
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
  }),
);
