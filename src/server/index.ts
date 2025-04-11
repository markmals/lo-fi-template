import { Hono } from "hono";
// import { serveStatic } from "@hono/node-server/serve-static";
import { reactRouter } from "remix-hono/handler";
import "react-router";
import { assert } from "@std/assert";
import { runMigrations } from "~/database/migrations.ts";
import { GuestBook } from "~/database/schema.ts";
import { DatabaseContext } from "~/database/context.ts";
import { books } from "./api/books.ts";
import { DatabaseSync } from "node:sqlite";
import { createDrizzle } from "~/database/node-sqlite.ts";

// FIXME: This isn't getting merged correctly
declare module "react-router" {
	interface AppLoadContext {
		VALUE_FROM_HONO: string;
	}
}

const DATABASE_URL = Deno.env.get("DATABASE_URL");
assert(DATABASE_URL, "Must define DATABASE_URL in .env file");

if (import.meta.env.PROD) {
	// Each time we deploy, we run the database migrations
	await runMigrations();
}

const server: Hono = new Hono();

const client = new DatabaseSync(DATABASE_URL);
const db = createDrizzle(client, { schema: { guestBook: GuestBook } });
server.use(DatabaseContext.provide(db));

// Sub-routes:
server.route("/api", books);

// if (import.meta.env.PROD) {
// 	server.use("*", serveStatic({ root: "./build/client" }));
// }

server.use(
	"*",
	reactRouter({
		// @ts-expect-error - virtual module provided by React Router at build time
		build: () => import("virtual:react-router/server-build"),
		mode: process.env.NODE_ENV as "production" | "development",
		getLoadContext: () => ({
			VALUE_FROM_HONO: "Hello from Hono",
		}),
	}),
);

export default server;
