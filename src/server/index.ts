import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { reactRouter } from "remix-hono/handler";
import "react-router";
import invariant from "tiny-invariant";
import { runMigrations } from "~/database/migrations";
import { GuestBook } from "~/database/schema";
import { DatabaseContext, type Schema } from "~/database/context";
import { books } from "./api/books";

invariant(process.env.DATABASE_URL, "Must define DATABASE_URL in .env file");

declare module "react-router" {
    interface AppLoadContext {
        VALUE_FROM_HONO: string;
    }
}

const server: Hono = new Hono();

// if (import.meta.env.PROD) {
//     // Each time we deploy, we run the database migrations
//     await runMigrations();
// }

const client = new Database(process.env.DATABASE_URL);
const db = drizzle<Schema>(client, { schema: { guestBook: GuestBook } });
server.use(DatabaseContext.provide(db));

// Add sub-routes here
server.route("/api", books);

if (import.meta.env.PROD) {
    server.use("*", serveStatic({ root: "./build/client" }));
}

server.use(
    "*",
    reactRouter({
        // @ts-expect-error - virtual module provided by React Router at build time
        // eslint-disable-next-line import/no-unresolved
        build: () => import("virtual:react-router/server-build"),
        mode: process.env.NODE_ENV as "production" | "development",
        getLoadContext: () => ({
            VALUE_FROM_HONO: "Hello from Hono",
        }),
    }),
);

export default server;
