/**
 * Migrasi #3: Agenda & acara
 *
 * Tabel: events, event_registrations, event_committee
 * Bergantung pada: 1_platform_pendaftaran_schemas, 2_keanggotaan_kepengurusan_schemas
 */
import {
  index,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { pk, ts, timestamps } from "./_common";
import { organizations } from "./1_platform_pendaftaran_schemas";
import { members } from "./2_keanggotaan_kepengurusan_schemas";

/* Nilai enum (dipakai juga di validasi form / Zod) */
export const EVENT_VISIBILITIES = ["internal", "publik"] as const;
export const EVENT_STATUSES = [
  "rencana",
  "berlangsung",
  "selesai",
  "batal",
] as const;
export const RSVP_VALUES = ["hadir", "tidak", "ragu"] as const;
export const CHECKIN_METHODS = ["qr", "manual"] as const;

export const events = sqliteTable(
  "events",
  {
    id: pk(),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    picId: text("pic_id").references(() => members.id, {
      onDelete: "set null",
    }),
    title: text("title").notNull(),
    description: text("description"),
    startAt: ts("start_at").notNull(),
    endAt: ts("end_at"),
    location: text("location"),
    visibility: text("visibility", { enum: EVENT_VISIBILITIES })
      .notNull()
      .default("internal"),
    status: text("status", { enum: EVENT_STATUSES })
      .notNull()
      .default("rencana"),
    ...timestamps,
  },
  (t) => [
    index("events_org_start_idx").on(t.orgId, t.startAt),
    index("events_visibility_idx").on(t.visibility),
  ],
);

export type Event = typeof events.$inferSelect;

export const eventRegistrations = sqliteTable(
  "event_registrations",
  {
    id: pk(),
    eventId: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    memberId: text("member_id")
      .notNull()
      .references(() => members.id, { onDelete: "cascade" }),
    rsvp: text("rsvp", { enum: RSVP_VALUES }),
    attendedAt: ts("attended_at"),
    checkinMethod: text("checkin_method", { enum: CHECKIN_METHODS }),
    ...timestamps,
  },
  (t) => [uniqueIndex("event_reg_uq").on(t.eventId, t.memberId)],
);

export const eventCommittee = sqliteTable(
  "event_committee",
  {
    id: pk(),
    eventId: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    memberId: text("member_id")
      .notNull()
      .references(() => members.id, { onDelete: "cascade" }),
    role: text("role").notNull(),
    task: text("task"),
    ...timestamps,
  },
  (t) => [index("committee_event_idx").on(t.eventId)],
);
