import "jsr:@std/dotenv/load";
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import deno from "@deno/vite-plugin";
import { denoAliases } from "./deno-aliases.plugin.ts";

export default defineConfig({
	plugins: [deno(), denoAliases(), reactRouter(), tailwindcss()],
	build: { target: "ESNext" },
	server: { port: Number.parseInt(Deno.env.get("PORT") || "1612") },
});
