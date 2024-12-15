import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import type { BlankEnv, BlankSchema } from "hono/types";
import { reactRouter } from "remix-hono/handler";
import { DatabaseContext, type Schema } from "~/database/context";
import { books } from "./api/books";
import "react-router";
import invariant from "tiny-invariant";
import { GuestBook } from "~/database/schema";
import { provide } from "./context/context";

invariant(process.env.DATABASE_URL, "Must define DATABASE_URL in .env file");

declare module "react-router" {
	interface AppLoadContext {
		VALUE_FROM_HONO: string;
	}
}

// @ts-expect-error - virtual module provided by React Router at build time
const BUILD = await import("virtual:react-router/server-build");

const server: Hono<BlankEnv, BlankSchema, "/"> = new Hono();

const client = new Database(process.env.DATABASE_URL);
const db = drizzle<Schema>(client, { schema: { guestBook: GuestBook } });
server.use(provide(DatabaseContext, db));

// Add sub-routes here
server.route("/api", books);

if (import.meta.env.PROD) {
	server.use("*", serveStatic({ root: "./build/client" }));
}

server.use(
	"*",
	reactRouter({
		build: BUILD,
		mode: process.env.NODE_ENV as "production" | "development",
		getLoadContext: () => ({
			VALUE_FROM_HONO: "Hello from Hono",
		}),
	}),
);

export default server;
