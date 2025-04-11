import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
	throw new Error("Must define DATABASE_URL in .env file");
}

// FIXME: This isn't working with either libsql nor better-sqlite3

export default defineConfig({
	out: "./src/drizzle",
	schema: "./src/database/schema.ts",
	dialect: "sqlite",
	dbCredentials: { url: process.env.DATABASE_URL },
});
