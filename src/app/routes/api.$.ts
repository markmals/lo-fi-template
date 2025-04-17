import { api } from "$api/mod.ts";
import type { Route } from "./+types/api.$.ts";

// You can pass in data from middleware to the Hono app via `env` here:

export const loader = ({ request, context }: Route.LoaderArgs) => api.fetch(request, { context });
export const action = ({ request, context }: Route.ActionArgs) => api.fetch(request, { context });
