import oxc from "oxc-transform";
import $ from "@david/dax";

// Run the react-router build command
await $`NODE_ENV=production deno run -A ./node_modules/.bin/react-router build`;

// Generate TypeScript declaration file
const serverEntry = await Deno.readTextFile("./src/server/index.ts");
const { code, errors } = oxc.isolatedDeclaration("index.ts", serverEntry);

if (errors.length > 0) {
	throw new Error(`Failed to generate declaration file: ${JSON.stringify(errors)}`);
}

await Deno.writeTextFile("./build/server/index.d.ts", code);
