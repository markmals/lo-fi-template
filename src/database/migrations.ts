import { $ } from "zx";

export async function runMigrations() {
	await $`npm run db:migrate`;
}
