import $ from "@david/dax";

// Run the vite build command
await $`NODE_ENV=production deno run -A npm:vite build`;

// Read the server build file
const buildFilePath = "./build/server/index.js";
const content = await Deno.readTextFile(buildFilePath);
if (!content) {
	throw new Error("Could not find server build file");
}

// Replace the import statement
const updatedContent = content.replace(
	/from ['"]react-dom\/server['"]/g,
	`from 'react-dom/server.node'`,
);

// Write back the modified content
await Deno.writeTextFile(buildFilePath, updatedContent);
