import { createTable } from "./node-sqlite.ts";
import { integer, text } from "drizzle-orm/sqlite-core";

export const GuestBook = createTable("guest_book", {
	id: integer().primaryKey(),
	name: text({ length: 255 }).notNull(),
	email: text({ length: 255 }).notNull().unique(),
});
