import "jsr:@std/dotenv/load";
import $ from "@david/dax";
import { assert } from "@std/assert";

const database = {
	async bootstrap() {
		const DATABASE_URL = Deno.env.get("DATABASE_URL");
		assert(DATABASE_URL, "Must define DATABASE_URL in .env file");

		try {
			// Remove existing database file if it exists
			await Deno.remove(DATABASE_URL).catch(() => {});

			// Create new empty database file
			await Deno.writeTextFile(DATABASE_URL, "");

			console.log("Database bootstrapped successfully");
		} catch (error) {
			console.error("Error bootstrapping database:", error);
			process.exit(1);
		}
	},
};

const app = {
	async build() {
		await $`NODE_ENV=production deno run -A npm:vite build`;
	},
	async startDevServer() {
		await $`deno run -A npm:vite dev --host`;
	},
	async startServer() {
		await $`deno run -A ./src/scripts/start.ts`;
	},
};

const tools = {
	async format() {
		await $`deno run -A npm:@biomejs/biome check --write --unsafe --assists-enabled=true .`;
	},
	async typecheck() {
		// Generate React Router types before typechecking

		// FIXME: This errors when tring to use `deno run -A npm:react-router dev` directly
		// Failed resolving binary export. './node_modules/.deno/react-router@7.5.0/node_modules/react-router/package.json' did not have a bin property
		await $`deno run -A ./node_modules/.bin/react-router typegen`;
		await $`deno check ./src`;
	},
};

type Subcommand = "fmt" | "typecheck" | "db" | "dev" | "build" | "serve";

const subcommand = Deno.args[0] as Subcommand;

switch (subcommand) {
	case "fmt": {
		await tools.format();
		break;
	}
	case "typecheck": {
		await tools.typecheck();
		break;
	}
	case "db": {
		const dbCommand = Deno.args[0];
		if (dbCommand !== "bootstrap") {
			console.error("[ERROR]: Only bootstraping database is currently supported:");
			console.info("$ deno run -A ./src/srcipts/lo-fi.ts db bootstrap");
			break;
		}

		await database.bootstrap();
		break;
	}
	case "dev": {
		// Always bootstrap the database before starting the dev server
		await database.bootstrap();
		await app.startDevServer();
		break;
	}
	case "build": {
		await app.build();
		break;
	}
	case "serve": {
		await app.startServer();
		break;
	}
	default: {
		console.error(`Unknown subcommand: ${subcommand}`);
		console.log("Available subcommands: fmt, typecheck, db, dev, build, serve");
		Deno.exit(1);
	}
}
