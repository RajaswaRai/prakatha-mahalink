import { defineConfig } from "drizzle-kit";
import { readdirSync } from "node:fs";

// Hanya file schema bernomor <= SCHEMA_UPTO yang ikut dimigrasi.
const upto = Number(process.env.SCHEMA_UPTO ?? 99);
const dir = "./src/db/schema";
const files = readdirSync(dir)
  .filter((f) => /^\d+_.+_schemas\.ts$/.test(f) && parseInt(f) <= upto)
  .sort((a, b) => parseInt(a) - parseInt(b))
  .map((f) => `${dir}/${f}`);

export default defineConfig({
  dialect: "sqlite",
  schema: files,
  out: "./drizzle",
  dbCredentials: { url: process.env.DATABASE_URL ?? "file:./local.db" },
});
