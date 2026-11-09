/**
 * Migrasi #8: Blog
 *
 * Tabel: post_categories, posts, post_tags, comments
 * Bergantung pada: 1_platform_pendaftaran_schemas, 4_arsip_dokumen_schemas
 */
import {
  index,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { pk, ts, timestamps } from "./_common";
import { organizations, users } from "./1_platform_pendaftaran_schemas";
import { tags } from "./4_arsip_dokumen_schemas";

/* Nilai enum (dipakai juga di validasi form / Zod) */
export const POST_STATUSES = [
  "draft",
  "review",
  "terjadwal",
  "terbit",
] as const;
export const COMMENT_STATUSES = ["menunggu", "disetujui", "spam"] as const;

export const postCategories = sqliteTable(
  "post_categories",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    ...timestamps,
  },
  (t) => [uniqueIndex("post_cat_org_slug_uq").on(t.orgId, t.slug)],
);

export const posts = sqliteTable(
  "posts",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    authorId: text("author_id")
      .notNull()
      .references(() => users.id),
    categoryId: text("category_id").references(() => postCategories.id, {
      onDelete: "set null",
    }),
    reviewedBy: text("reviewed_by").references(() => users.id, {
      onDelete: "set null",
    }),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull().default(""),
    coverKey: text("cover_key"),
    status: text("status", { enum: POST_STATUSES }).notNull().default("draft"),
    scheduledAt: ts("scheduled_at"),
    publishedAt: ts("published_at"),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("posts_org_slug_uq").on(t.orgId, t.slug),
    index("posts_status_pub_idx").on(t.status, t.publishedAt),
  ],
);

export type Post = typeof posts.$inferSelect;

export const postTags = sqliteTable(
  "post_tags",
  {
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.postId, t.tagId] })],
);

export const comments = sqliteTable(
  "comments",
  {
    id: pk(),
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    body: text("body").notNull(),
    status: text("status", { enum: COMMENT_STATUSES })
      .notNull()
      .default("menunggu"),
    ...timestamps,
  },
  (t) => [index("comments_post_status_idx").on(t.postId, t.status)],
);
