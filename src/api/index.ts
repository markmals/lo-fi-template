import { Hono } from "hono";
import { books } from "./routes/books.ts";
import type { AppLoadContext } from "react-router";

export type ReactRouterBindings = { Bindings: { context: AppLoadContext } };

const api = new Hono<ReactRouterBindings>().basePath("/api");

// Sub-routes:
api.route("/", books);

export { api };
