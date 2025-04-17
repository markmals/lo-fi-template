import "jsr:@std/dotenv/load";
import { serveFile } from "@std/http/file-server";
import { join } from "@std/path/join";
import { createRequestHandler, type ServerBuild } from "react-router";

const handler = await createDenoRequestHandler(
	// @ts-expect-error React Router server build is not typed
	await import("../../build/server/index.js"),
);
const port = Number.parseInt(Deno.env.get("PORT") || "4321");

console.log("Starting production server...");
Deno.serve({ port }, handler);
console.log(`Server is running on http://localhost:${port}`);

export async function createDenoRequestHandler(
	build: ServerBuild | (() => ServerBuild | Promise<ServerBuild>),
) {
	const handleRequest = createRequestHandler(build, "production");

	return async function handler(request: Request) {
		const pathname = new URL(request.url).pathname;

		try {
			const filePath = join("./build/client", pathname);
			const fileInfo = await Deno.stat(filePath);

			if (fileInfo.isDirectory) {
				throw new Deno.errors.NotFound();
			}

			// The request is for a static file that exists

			const response = await serveFile(request, filePath, { fileInfo });

			if (pathname.startsWith("/assets/")) {
				response.headers.set("cache-control", "public, max-age=31536000, immutable");
			} else {
				response.headers.set("cache-control", "public, max-age=600");
			}

			return response;
		} catch (error) {
			if (!(error instanceof Deno.errors.NotFound)) {
				throw error;
			}
		}

		return handleRequest(request);
	};
}
