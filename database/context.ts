import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { Context } from "server/context/context";
import type { GuestBook } from "./schema";

export type Schema = { guestBook: typeof GuestBook };

export const DatabaseContext = new Context<BunSQLiteDatabase<Schema>>("database");
