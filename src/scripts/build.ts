import oxc from "oxc-transform";
import { $ } from "zx";
import fs from "node:fs/promises";

// Run the react-router build command
await $`NODE_ENV=production npx react-router build`;

// Generate TypeScript declaration file
const serverEntry = await fs.readFile("./src/server/index.ts", "utf-8");
const { code, errors } = oxc.isolatedDeclaration("index.ts", serverEntry);

if (errors.length > 0) {
    throw new Error(`Failed to generate declaration file: ${JSON.stringify(errors)}`);
}

await fs.writeFile("./build/server/index.d.ts", code);
