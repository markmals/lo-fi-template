import { Hono } from "hono";
import { guestBook } from "./routes/guest-book.ts";
import type { AppLoadContext } from "react-router";

export type ReactRouterBindings = { Bindings: { context: AppLoadContext } };

const api = new Hono<ReactRouterBindings>().basePath("/api");

// Sub-routes:
api.route("/", guestBook);

export { api };
