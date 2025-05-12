import type { Plugin } from "vite";
import { parse } from "@std/jsonc";
import type { DenoConfig } from "./deno.config.d.ts";
import { join, dirname } from "@std/path";

export function denoAliases({
	configFile: filePath = "deno.jsonc",
}: { configFile?: string } = {}): Plugin {
	return {
		name: "deno-aliases-plugin",
		async config() {
			try {
				// Try to read deno.jsonc first, then fall back to deno.json
				let config: string;
				try {
					config = await Deno.readTextFile(filePath);
				} catch {
					config = await Deno.readTextFile("deno.json");
				}

				const deno = parse(config) as DenoConfig;
				const imports = deno.imports || {};

				// Handle import map if specified
				let importMapAliases: Record<string, string> = {};
				if (deno.importMap) {
					try {
						const importMapPath = deno.importMap;
						const importMapContent = await Deno.readTextFile(importMapPath);
						const importMap = parse(importMapContent) as Pick<DenoConfig, "imports">;

						if (importMap.imports) {
							// Process import map aliases
							importMapAliases = Object.entries(importMap.imports)
								.filter(
									([, value]) =>
										typeof value === "string" &&
										(value.startsWith("./") || value.startsWith("../")),
								)
								.reduce(
									(acc, [key, value]) => {
										// Convert the path to an absolute path
										// For import maps, resolve relative to the import map file
										const importMapDir = dirname(importMapPath);
										acc[key] = join(importMapDir, value as string);
										return acc;
									},
									{} as Record<string, string>,
								);
						}
					} catch (error) {
						console.warn("Failed to load import map:", error);
					}
				}

				return {
					resolve: {
						// Filter out only path aliases (those that point to local files)
						alias: {
							...Object.entries(imports)
								.filter(
									([key, value]) =>
										typeof value === "string" &&
										(value.startsWith("./") || value.startsWith("../")) &&
										// Typically path aliases end with / or point to specific files
										(key.endsWith("/") || key.includes(":")),
								)
								.reduce(
									(acc, [key, value]) => {
										// Convert the path to an absolute path
										acc[key] = new URL(value, import.meta.url).pathname;
										return acc;
									},
									{} as Record<string, string>,
								),
							...importMapAliases,
						},
					},
				};
			} catch (error) {
				console.error("Failed to load Deno config for aliases:", error);
				return {};
			}
		},
	};
}
