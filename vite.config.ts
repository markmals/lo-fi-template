import "jsr:@std/dotenv/load";
import deno from "@deno/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { denoAliases } from "./deno-aliases.plugin.ts";

export default defineConfig({
	plugins: [deno(), denoAliases(), reactRouter(), tailwindcss()],
	build: { target: "ESNext" },
	server: { port: Number.parseInt(Deno.env.get("PORT") || "1612") },
});
