import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./schemas",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL || "",
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_POSTGRES_DATABASE,
  },
  verbose: true,
  strict: true,
  out: "migrations",
});
