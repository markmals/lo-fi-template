import $ from "@david/dax";

export async function runMigrations() {
	await $`deno task db:migrate`;
}
