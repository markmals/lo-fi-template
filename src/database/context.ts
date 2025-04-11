import type { SqliteRemoteDatabase } from "drizzle-orm/sqlite-proxy";
import { Context } from "../server/context/context.ts";
import type { GuestBook } from "./schema.ts";

export type Schema = { guestBook: typeof GuestBook };

export const DatabaseContext = new Context<SqliteRemoteDatabase<Schema>>();
