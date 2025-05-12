import type { ReactRouterBindings } from "$api";
import { db } from "$db";
import { GUEST_BOOK, type GuestBook } from "$db/schema.ts";
import { Hono } from "hono";

const guestBook = new Hono<ReactRouterBindings>().basePath("/guest-book");

// GET /api/guest-book/
guestBook.get("/", async c => {
	const guestBook = (await Array.fromAsync(db.list<GuestBook>({ prefix: [GUEST_BOOK] }))).map(
		entry => entry.value,
	);

	return c.json({ guestBook });
});

// GET /api/guest-book/:id
guestBook.get("/:id", async c => {
	const id = Number.parseInt(c.req.param("id"));
	const entry = await db.get<GuestBook>([GUEST_BOOK, id]);
	return c.json({ entry: entry.value });
});

// POST /api/guest-book
guestBook.post("/", async c => {
	const entry = (await c.req.json()) as GuestBook;
	await db.set([GUEST_BOOK, entry.id], entry);
	return c.json({ success: true });
});

export { guestBook };
