import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const GuestBook = sqliteTable("guest_book", {
	id: integer().primaryKey(),
	name: text({ length: 255 }).notNull(),
	email: text({ length: 255 }).notNull().unique(),
});
