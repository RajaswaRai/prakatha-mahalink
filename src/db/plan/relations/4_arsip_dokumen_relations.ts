/**
 * Relasi #4: Arsip dokumen
 * Tabel yang relasinya didefinisikan di sini: tags, documentCategories, documents, documentVersions
 *
 * Aturan: tiap tabel punya relasinya di SATU file saja (sesuai file schema pemilik tabelnya),
 * karena index.ts menggabungkan semua bagian dengan spread object.
 */
import { defineRelationsPart } from "drizzle-orm";
import * as schema from "../schema";

export const arsipDokumenRelations = defineRelationsPart(schema, (r) => ({
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
}));
