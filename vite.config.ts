import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import deno from "@deno/vite-plugin";

const SERVER_ENTRY = "./src/server/index.ts";

export default defineConfig(({ isSsrBuild }) => ({
	plugins: [
		deno(),
		reactRouter(),
		tailwindcss(),
		// FIXME: Fix or Remove Hono
		// honoDevServer({
		// 	entry: SERVER_ENTRY,
		// 	exclude: [...defaultOptions.exclude, "/assets/**", "/src/**"],
		// 	injectClientScript: false,
		// }) as any,
	],
	build: {
		target: "ES2022",
		rollupOptions: isSsrBuild ? { input: SERVER_ENTRY } : undefined,
	},
	server: {
		port: Number.parseInt(process.env.PORT || "4321"),
	},
	resolve: {
		alias: {
			"~/database/": new URL("./src/database/", import.meta.url).pathname,
			"~/": new URL("./src/app/", import.meta.url).pathname,
		},
	},
}));
