import * as fs from "node:fs/promises";
import { $ } from "bun";
import oxc from "oxc-transform";

// Run the react-router build command
await $`NODE_ENV=production bunx --bun react-router build`;

// Read the server build file
const serverBuildDir = "./build/server/assets";
const files = await fs.readdir(serverBuildDir);
const serverBuildFile = files.find(path => path.endsWith(".js") && path.includes("server-build"));
if (!serverBuildFile) {
	throw new Error("Could not find server build file");
}

const serverBuildPath = `${serverBuildDir}/${serverBuildFile}`;
const content = await fs.readFile(serverBuildPath, "utf-8");

// Replace the import statement
const updatedContent = content.replace(
	/from ['"]react-dom\/server['"]/g,
	`from 'react-dom/server.node'`,
);

// Write back the modified content
await fs.writeFile(serverBuildPath, updatedContent);

// Generate TypeScript declaration file
const serverEntry = await fs.readFile("./server/index.ts", "utf-8");
const { code, errors } = oxc.isolatedDeclaration("index.ts", serverEntry);

if (errors.length > 0) {
	throw new Error(`Failed to generate declaration file: ${JSON.stringify(errors)}`);
}

await fs.writeFile("./build/server/index.d.ts", code);
