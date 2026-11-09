/**
 * Relasi #6: Surat antar organisasi
 * Tabel yang relasinya didefinisikan di sini: letters
 */
import { defineRelationsPart } from "drizzle-orm";
import * as schema from "../schema";

export const suratAntarOrganisasiRelations = defineRelationsPart(
  schema,
  (r) => ({
    letters: {
      fromOrganization: r.one.organizations({
        from: r.letters.fromOrgId,
        to: r.organizations.id,
        alias: "letter_sender",
        optional: false,
      }),
      toOrganization: r.one.organizations({
        from: r.letters.toOrgId,
        to: r.organizations.id,
        alias: "letter_recipient",
        optional: false,
      }),
      creator: r.one.users({
        from: r.letters.createdBy,
        to: r.users.id,
        alias: "letter_creator",
        optional: false,
      }),
      sender: r.one.users({
        from: r.letters.sentBy,
        to: r.users.id,
        alias: "letter_sender_user",
      }),
      reader: r.one.users({
        from: r.letters.readBy,
        to: r.users.id,
        alias: "letter_reader",
      }),
      replyTo: r.one.letters({
        from: r.letters.replyToId,
        to: r.letters.id,
        alias: "letter_thread",
      }),
      replies: r.many.letters({
        from: r.letters.id,
        to: r.letters.replyToId,
        alias: "letter_thread",
      }),
    },
  }),
);
