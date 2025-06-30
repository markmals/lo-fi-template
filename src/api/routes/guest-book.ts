import { db } from "$db/mod.ts";
import { GuestBook } from "$db/schema.ts";
import { eq } from "@mizchi/drizzle-orm/dist/sql/expressions/index.js";
import { Hono } from "hono";
import type { ReactRouterBindings } from "../mod.ts";

const guestBook = new Hono<ReactRouterBindings>().basePath("/guest-book");

// GET /api/guest-book/
guestBook.get("/", async c => {
    const guestBook = await db.select().from(GuestBook);
    return c.json({ guestBook });
});

// GET /api/guest-book/:id
guestBook.get("/:id", async c => {
    const id = Number.parseInt(c.req.param("id"));
    const entry = await db.select().from(GuestBook).where(eq(GuestBook.id, id));
    return c.json({ entry: entry });
});

// POST /api/guest-book
guestBook.post("/", async c => {
    const entry = (await c.req.json()) as typeof GuestBook.$inferInsert;
    await db.insert(GuestBook).values(entry);
    return c.json({ success: true });
});

export { guestBook };
