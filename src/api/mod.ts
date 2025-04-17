import { Hono } from "hono";
import type { AppLoadContext } from "react-router";
import { books } from "./routes/books.ts";

export type ReactRouterBindings = { Bindings: { context: AppLoadContext } };

const api = new Hono<ReactRouterBindings>().basePath("/api");

// Sub-routes:
api.route("/", books);

export { api };
