import { $ } from "bun";

export async function runMigrations() {
	await $`bun run db:migrate`;
}
