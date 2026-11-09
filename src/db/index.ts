import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import "server-only";

if (!process.env.DB_FILE_NAME) {
  throw new Error("DB_FILE_NAME environment variable is not defined");
}

const db = drizzle(process.env.DB_FILE_NAME!);

export default db;
