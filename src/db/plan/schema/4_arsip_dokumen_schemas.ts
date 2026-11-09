/**
 * Migrasi #4: Arsip dokumen
 *
 * Tabel: tags, document_categories, documents, document_versions, document_tags, letter_sequences
 * Bergantung pada: 1_platform_pendaftaran_schemas, 3_agenda_acara_schemas
 */
import { sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { pk, ts, timestamps } from "./_common";
import { organizations, users } from "./1_platform_pendaftaran_schemas";
import { events } from "./3_agenda_acara_schemas";

/* Nilai enum (dipakai juga di validasi form / Zod) */
export const VISIBILITIES = ["privat", "internal", "publik"] as const;

export const tags = sqliteTable(
  "tags",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
  },
  (t) => [uniqueIndex("tags_org_name_uq").on(t.orgId, t.name)],
);

export const documentCategories = sqliteTable(
  "document_categories",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    ...timestamps,
  },
  (t) => [index("doc_cat_org_idx").on(t.orgId)],
);

export const documents = sqliteTable(
  "documents",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    categoryId: text("category_id").references(() => documentCategories.id, {
      onDelete: "set null",
    }),
    eventId: text("event_id").references(() => events.id, {
      onDelete: "set null",
    }),
    title: text("title").notNull(),
    fileKey: text("file_key").notNull(),
    mimeType: text("mime_type"),
    sizeBytes: integer("size_bytes"),
    visibility: text("visibility", { enum: VISIBILITIES })
      .notNull()
      .default("internal"),
    letterNumber: text("letter_number"),
    uploadedBy: text("uploaded_by").references(() => users.id, {
      onDelete: "set null",
    }),
    currentVersion: integer("current_version").notNull().default(1),
    ...timestamps,
  },
  (t) => [
    index("docs_org_cat_idx").on(t.orgId, t.categoryId),
    index("docs_org_created_idx").on(t.orgId, t.createdAt),
    index("docs_event_idx").on(t.eventId),
  ],
);

export type Document = typeof documents.$inferSelect;

export const documentVersions = sqliteTable(
  "document_versions",
  {
    id: pk(),
    documentId: text("document_id")
      .notNull()
      .references(() => documents.id, { onDelete: "cascade" }),
    versionNo: integer("version_no").notNull(),
    fileKey: text("file_key").notNull(),
    uploadedBy: text("uploaded_by").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: ts("created_at")
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (t) => [uniqueIndex("doc_versions_uq").on(t.documentId, t.versionNo)],
);

export const documentTags = sqliteTable(
  "document_tags",
  {
    documentId: text("document_id")
      .notNull()
      .references(() => documents.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.documentId, t.tagId] })],
);

export const letterSequences = sqliteTable(
  "letter_sequences",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    year: integer("year").notNull(),
    lastNumber: integer("last_number").notNull().default(0),
  },
  (t) => [uniqueIndex("letter_seq_uq").on(t.orgId, t.year)],
);
