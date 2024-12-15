import { defineConfig } from "vite";

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

import honoDevServer, { defaultOptions } from "@hono/vite-dev-server";
import bunAdapter from "@hono/vite-dev-server/bun";

const SERVER_ENTRY = "./server/index.ts";

export default defineConfig(({ isSsrBuild }) => ({
	plugins: [
		reactRouter(),
		tailwindcss(),
		honoDevServer({
			entry: SERVER_ENTRY,
			adapter: bunAdapter,
			exclude: [...defaultOptions.exclude, "/assets/**", "/app/**"],
			injectClientScript: false,
		}),
		tsconfigPaths(),
	],
	build: {
		target: "ES2022",
		rollupOptions: isSsrBuild ? { input: SERVER_ENTRY } : undefined,
	},
}));
