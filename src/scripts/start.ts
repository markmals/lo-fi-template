import "jsr:@std/dotenv/load";
import server from "../../build/server/index.js";

console.log("Starting production server...");

const port = Number.parseInt(Deno.env.get("PORT") || "4321");
Deno.serve({ port }, server.fetch);

console.log(`Server is running on http://localhost:${port}`);
