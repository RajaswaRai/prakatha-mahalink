/**
 * Relasi #8: Blog
 * Tabel yang relasinya didefinisikan di sini: postCategories, posts, comments
 *
 * Aturan: tiap tabel punya relasinya di SATU file saja (sesuai file schema pemilik tabelnya),
 * karena index.ts menggabungkan semua bagian dengan spread object.
 */
import { defineRelationsPart } from "drizzle-orm";
import * as schema from "../schema";

export const blogRelations = defineRelationsPart(schema, (r) => ({
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
}));
