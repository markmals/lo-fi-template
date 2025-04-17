import "jsr:@std/dotenv/load";
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import deno from "@deno/vite-plugin";

export default defineConfig({
	plugins: [deno(), reactRouter(), tailwindcss()],
	build: {
		target: "ESNext",
	},
	server: {
		port: Number.parseInt(Deno.env.get("PORT") || "4321"),
	},
	resolve: {
		alias: {
			"$api/": new URL("./src/api/", import.meta.url).pathname,
			"$db/": new URL("./src/database/", import.meta.url).pathname,
			"~/": new URL("./src/app/", import.meta.url).pathname,
		},
	},
});
