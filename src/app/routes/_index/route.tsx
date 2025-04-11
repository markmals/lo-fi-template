import { GuestBook } from "~/database/schema.ts";
import { Context } from "../../../server/context/context.ts";
import { DatabaseContext } from "~/database/context.ts";
// FIXME: Types get generated incorrectly by default
// Need to add Deno file extensions (.ts and .tsx instead of .js)
import type { Route } from "./+types/route.ts";
import { Welcome } from "./Welcome.tsx";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	let name = formData.get("name");
	let email = formData.get("email");
	if (typeof name !== "string" || typeof email !== "string") {
		return { guestBookError: "Name and email are required" };
	}

	name = name.trim();
	email = email.trim();
	if (!name || !email) {
		return { guestBookError: "Name and email are required" };
	}

	const db = Context.get(DatabaseContext);
	try {
		await db.insert(GuestBook).values({ name, email });
	} catch {
		return { guestBookError: "Error adding to guest book" };
	}
}

export async function loader({ context }: Route.LoaderArgs) {
	const db = Context.get(DatabaseContext);

	const guestBook = await db
		.select({
			id: GuestBook.id,
			name: GuestBook.name,
		})
		.from(GuestBook);

	return {
		guestBook,
		message: context.VALUE_FROM_HONO,
	};
}

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
	return (
		<Welcome
			guestBook={loaderData.guestBook}
			guestBookError={actionData?.guestBookError}
			message={loaderData.message}
		/>
	);
}
