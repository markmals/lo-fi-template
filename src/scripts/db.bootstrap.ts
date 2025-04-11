import "jsr:@std/dotenv/load";
import { assert } from "@std/assert";
import { DatabaseSync } from "node:sqlite";
import { createDrizzle } from "~/database/node-sqlite.ts";
import { migrate } from "drizzle-orm/sqlite-proxy/migrator";

const DATABASE_URL = Deno.env.get("DATABASE_URL");
assert(DATABASE_URL, "Must define DATABASE_URL in .env file");

try {
	// Remove existing database file if it exists
	await Deno.remove(DATABASE_URL).catch(() => {});

	// Create new empty database file
	await Deno.writeTextFile(DATABASE_URL, "");

	// Create necessary tables using drizzle-kit push
	// await $`deno run -A npm:drizzle-kit push`;
	const client = new DatabaseSync(DATABASE_URL);
	const db = createDrizzle(client);
	// FIXME: Manually migrate because drizzle-kit isn't working with Deno
	migrate(db, async () => {}, { migrationsFolder: "./drizzle" });

	// console.log("Database bootstrapped successfully");
} catch (error) {
	console.error("Error bootstrapping database:", error);
	process.exit(1);
}
