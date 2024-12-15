import { Hono } from "hono";

const books = new Hono().basePath("/books");

books.get("/", c => c.text("List Books")); // GET /api
books.get("/:id", c => {
	// GET /api/:id
	const id = c.req.param("id");
	return c.text(`Get Book: ${id}`);
});
books.post("/", c => c.text("Create Book")); // POST /api

export { books };
