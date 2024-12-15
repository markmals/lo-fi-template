import { AsyncLocalStorage } from "node:async_hooks";
import { createMiddleware } from "hono/factory";

export class Context<Value> {
	#storage = new AsyncLocalStorage<Value>();
	#namespace: string;
	#defaultValue?: Value;

	constructor(namespace: string, defaultValue?: Value) {
		this.#namespace = namespace;
		this.#defaultValue = defaultValue;
	}

	provide<Body>(value: Value, callback: () => Body) {
		return this.#storage.run(value, callback);
	}

	static use<Value>(ctx: Context<Value>) {
		const value = ctx.#storage.getStore() ?? ctx.#defaultValue;
		if (!value) {
			throw new Error(`No value found for context ${ctx.#namespace}`);
		}
		return value;
	}
}

export function provide<Value>(context: Context<Value>, value: Value) {
	return createMiddleware((_, next) => context.provide(value, next));
}
