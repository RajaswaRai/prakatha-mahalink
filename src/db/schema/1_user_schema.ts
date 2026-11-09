import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { pk, ts, timestamps } from "./_common";

/* Nilai enum (dipakai juga di validasi form / Zod) */
export const PLATFORM_ROLES = ["mahasiswa", "dosen", "admin"] as const;
export const USER_STATUSES = ["pending", "active", "inactive"] as const;

// export const ORG_TYPES = ["ukm", "himpunan", "bem", "lainnya"] as const;

export const users = sqliteTable(
  "users",
  {
    id: pk(),
    email: text("email").notNull().unique(),
    googleId: text("google_id").unique(),
    name: text("name").notNull(),
    nim: text("nim").unique(),
    phone: text("phone"),
    platformRole: text("platform_role", { enum: PLATFORM_ROLES }).notNull(),
    status: text("status", { enum: USER_STATUSES })
      .notNull()
      .default("pending"),
    ...timestamps,
  },
  (t) => [
    index("users_status_idx").on(t.status),
    index("users_role_idx").on(t.platformRole),
  ],
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
