import { GUEST_BOOK, type GuestBook } from "$db/schema.ts";
import { Hono } from "hono";
import { kv } from "../../database/mod.ts";
import type { ReactRouterBindings } from "../mod.ts";

const guestBook = new Hono<ReactRouterBindings>().basePath("/guest-book");

// GET /api/guest-book/
guestBook.get("/", async (c) => {
    const guestBook = (await Array.fromAsync(kv.list<GuestBook>({ prefix: [GUEST_BOOK] }))).map(
        (entry) => entry.value,
    );

    return c.json({ guestBook });
});

// GET /api/guest-book/:id
guestBook.get("/:id", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const entry = await kv.get<GuestBook>([GUEST_BOOK, id]);
    return c.json({ entry: entry.value });
});

// POST /api/guest-book
guestBook.post("/", async (c) => {
    const entry = (await c.req.json()) as GuestBook;
    await kv.set([GUEST_BOOK, entry.id], entry);
    return c.json({ success: true });
});

export { guestBook };
