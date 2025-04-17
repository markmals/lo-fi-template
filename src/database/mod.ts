import { DatabaseSync } from "node:sqlite";
import { assert } from "@std/assert";
import { createDrizzle } from "./node-sqlite.ts";
import { GuestBook } from "./schema.ts";

const DATABASE_URL = Deno.env.get("DATABASE_URL");
assert(DATABASE_URL, "Must define DATABASE_URL in .env file");

const client = new DatabaseSync(DATABASE_URL);
export const db = createDrizzle(client, { schema: { guestBook: GuestBook } });
