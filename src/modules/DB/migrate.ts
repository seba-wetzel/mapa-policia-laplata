import { loadEnvConfig } from "@next/env";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { db } from "./index";

const dev = process.env.NODE_ENV !== "production";
loadEnvConfig("../../..", dev);

migrate(db, {
  migrationsFolder: "migrations",
});
