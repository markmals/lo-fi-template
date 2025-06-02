import { api } from "$api";
import { serveDir, serveFile } from "@std/http/file-server";
import { Hono } from "hono";
import { createRequestHandler } from "react-router";

const handler = createRequestHandler(
    // @ts-expect-error React Router server build is not typed
    () => import("../../build/server/index.js"),
    "production",
);

const app = new Hono();
app.route("/api", api);
app.use(async (c) => {
    const pathname = new URL(c.req.url).pathname;

    if (pathname === "/favicon.ico") {
        return serveFile(c.req.raw, "build/client/favicon.ico");
    }

    if (pathname.startsWith("/assets/")) {
        return serveDir(c.req.raw, {
            fsRoot: "build/client/assets",
            urlRoot: "assets",
            headers: ["Cache-Control: public, max-age=31536000, immutable"],
        });
    }

    return await handler(c.req.raw);
});

const port = Number.parseInt(Deno.env.get("PORT") || "3000");

console.log("Starting production server...");
Deno.serve({ port }, app.fetch);
console.log(`Server is running on http://localhost:${port}`);
