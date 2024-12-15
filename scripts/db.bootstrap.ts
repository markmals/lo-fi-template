import * as fs from "node:fs/promises";
import { $ } from "bun";

try {
	// Extract file path from DATABASE_URL
	const databaseURL = new URL(process.env.DATABASE_URL!);
	const databasePath = databaseURL.pathname.slice(1);

	// Remove existing database file if it exists
	await fs.unlink(databasePath).catch(() => {});

	// Create new empty database file
	await fs.writeFile(databasePath, "");

	// Create necessary tables using drizzle-kit push
	await $`bunx --bun drizzle-kit push`;

	console.log("Database bootstrapped successfully");
} catch (error) {
	console.error("Error bootstrapping database:", error);
	process.exit(1);
}
