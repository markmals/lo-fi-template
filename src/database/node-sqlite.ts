import type { DatabaseSync } from "node:sqlite";
import type { DrizzleConfig } from "drizzle-orm";
import { type SQLiteTableFn, sqliteTable } from "drizzle-orm/sqlite-core";
import { type SqliteRemoteDatabase, drizzle } from "drizzle-orm/sqlite-proxy";

/**
 * Returns a new object with entries sorted by key.
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function sortByKey<T extends Record<string, any>>(
	obj: T,
	compareFn?: (a: string, b: string) => number,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
): any {
	return Object.keys(obj)
		.sort(compareFn)
		.reduce((acc, key) => {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(acc as any)[key] = obj[key];
			return acc;
		}, {});
}

export const createTable: SQLiteTableFn = (name, columns, config) => {
	return sqliteTable(
		name,
		// NOTE: You'll have to make sure that table keys are sorted!
		// Otherwise it won't work.
		sortByKey(columns),
		config,
	);
};

export function createDrizzle<Schema extends Record<string, unknown> = Record<string, never>>(
	database: DatabaseSync,
	config?: DrizzleConfig<Schema>,
): SqliteRemoteDatabase<Schema> {
	return drizzle(async (sql, params, method) => {
		const statement = database.prepare(sql);

		switch (method) {
			case "all": {
				const rows = statement.all(...params);
				return {
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					rows: rows.map(row => Object.values(row as any)),
				};
			}

			case "get": {
				const row = statement.get(...params);
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				return { rows: [Object.values(row as any)] };
			}

			case "run":
			case "values":
				statement.run(...params);
				return { rows: [] };
		}
	}, config);
}
