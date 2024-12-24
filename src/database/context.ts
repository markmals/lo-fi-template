import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { Context } from "src/server/context/context";
import type { GuestBook } from "./schema";

export type Schema = { guestBook: typeof GuestBook };

export const DatabaseContext = new Context<BetterSQLite3Database<Schema>>();
