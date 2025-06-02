import { kv } from "$db";
import { getId, GUEST_BOOK, type GuestBook } from "$db/schema.ts";
import type { Route } from "./+types/route.ts";
import { Welcome } from "./Welcome.tsx";

export function meta() {
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

    try {
        const newId = await getId();
        await kv.set([GUEST_BOOK, newId], { id: newId, name, email });
    } catch {
        return { guestBookError: "Error adding to guest book" };
    }
}

export async function loader() {
    const guestBook = (await Array.fromAsync(kv.list<GuestBook>({ prefix: [GUEST_BOOK] }))).map(
        (entry) => entry.value,
    );

    return {
        guestBook,
    };
}

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
    return <Welcome guestBook={loaderData.guestBook} guestBookError={actionData?.guestBookError} />;
}
