import invariant from "tiny-invariant";
import { $ } from "zx";
import fs from "node:fs/promises";

invariant(process.env.DATABASE_URL, "Must define DATABASE_URL in .env file");

try {
    // Remove existing database file if it exists
    await fs.unlink(process.env.DATABASE_URL).catch(() => {});

    // Create new empty database file
    await fs.writeFile(process.env.DATABASE_URL, "");

    // Create necessary tables using drizzle-kit push
    await $`npx drizzle-kit push`;

    console.log("Database bootstrapped successfully");
} catch (error) {
    console.error("Error bootstrapping database:", error);
    process.exit(1);
}