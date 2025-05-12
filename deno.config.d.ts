/**
 * A JSON representation of a Deno configuration file.
 */
export interface DenoConfig {
	/**
	 * Configuration for deno bench
	 */
	bench?: Bench;
	/**
	 * Instructs the TypeScript compiler how to compile .ts files.
	 */
	compilerOptions?: CompilerOptions;
	/**
	 * List of files, directories or globs that will be ignored by all other configurations.
	 * Requires Deno 1.34 or later.
	 */
	exclude?: string[];
	exports?: { [key: string]: any } | string;
	/**
	 * Configuration for formatter
	 */
	fmt?: Fmt;
	/**
	 * The location of an import map to be used when resolving modules. If an import map is
	 * specified as an `--importmap` flag or using "imports" and "scopes" properties, they will
	 * override this value.
	 */
	importMap?: string;
	/**
	 * A map of specifiers to their remapped specifiers.
	 */
	imports?: { [key: string]: string };
	/**
	 * The SPDX license identifier if this is a JSR package. Specify this or add a license file
	 * to the package.
	 */
	license?: string;
	/**
	 * Configuration for linter
	 */
	lint?: Lint;
	/**
	 * Whether to use a lock file or the path to use for the lock file. Can be overridden by CLI
	 * arguments.
	 */
	lock?: boolean | LockObject | string;
	/**
	 * The name of this JSR package. Must be scoped
	 */
	name?: string;
	nodeModulesDir?: boolean | NodeModulesDirEnum;
	/**
	 * UNSTABLE: List of relative paths to folders containing JSR packages to use local versions
	 * of.
	 */
	patch?: string[];
	/**
	 * Configuration for deno publish
	 */
	publish?: Publish;
	/**
	 * Define a scope which remaps a specifier in only a specified scope
	 */
	scopes?: { [key: string]: { [key: string]: string } };
	/**
	 * Configuration for deno task
	 */
	tasks?: Tasks;
	/**
	 * Configuration for deno test
	 */
	test?: Test;
	/**
	 * List of unstable features to enable.
	 */
	unstable?: string[];
	/**
	 * Enables or disables the use of a local vendor folder as a local cache for remote modules
	 * and node_modules folder for npm packages. Alternatively, use the `--vendor` flag or
	 * override the config via `--vendor=false`. Requires Deno 1.36.1 or later.
	 */
	vendor?: boolean;
	/**
	 * The version of this JSR package.
	 */
	version?: string;
	workspace?: string[] | WorkspaceObject;
}

/**
 * Configuration for deno bench
 */
export interface Bench {
	/**
	 * List of files, directories or globs that will not be searched for benchmarks.
	 */
	exclude?: string[];
	/**
	 * List of files, directories or globs that will be searched for benchmarks.
	 */
	include?: string[];
}

/**
 * Instructs the TypeScript compiler how to compile .ts files.
 */
export interface CompilerOptions {
	/**
	 * Allow JavaScript files to be a part of your program. Use the `checkJS` option to get
	 * errors from these files.
	 */
	allowJs?: boolean;
	/**
	 * Disable error reporting for unreachable code.
	 */
	allowUnreachableCode?: boolean;
	/**
	 * Disable error reporting for unused labels.
	 */
	allowUnusedLabels?: boolean;
	/**
	 * Enable error reporting in type-checked JavaScript files.
	 */
	checkJs?: boolean;
	/**
	 * Emit design-type metadata for decorated declarations in source files.
	 */
	emitDecoratorMetadata?: boolean;
	/**
	 * Do not allow runtime constructs that are not part of ECMAScript.
	 */
	erasableSyntaxOnly?: boolean | null;
	/**
	 * Interpret optional property types as written, rather than adding 'undefined'.
	 */
	exactOptionalPropertyTypes?: boolean;
	/**
	 * Enable experimental support for legacy experimental decorators.
	 */
	experimentalDecorators?: boolean;
	/**
	 * Require sufficient annotation on exports so other tools can trivially generate
	 * declaration files.
	 */
	isolatedDeclarations?: boolean;
	/**
	 * Specify what JSX code is generated.
	 */
	jsx?: JSX;
	/**
	 * Specify the JSX factory function used when targeting React JSX emit, e.g.
	 * 'React.createElement' or 'h'
	 */
	jsxFactory?: string;
	/**
	 * Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g.
	 * 'React.Fragment' or 'Fragment'.
	 */
	jsxFragmentFactory?: string;
	/**
	 * Specify module specifier used to import the JSX factory functions when using jsx:
	 * 'react-jsx*'.
	 */
	jsxImportSource?: string;
	/**
	 * Specify module specifier used to import the types for the JSX factory functions when
	 * using jsx: 'react-jsx*'. This is the logical equivalent of prefixing an import to the
	 * jsxImportSource with `// @deno-types="..."`.
	 */
	jsxImportSourceTypes?: string;
	/**
	 * Specify list of elements that should be exempt from being precompiled when the jsx
	 * 'precompile' transform is used.
	 */
	jsxPrecompileSkipElements?: string[];
	/**
	 * Specify a set of bundled library declaration files that describe the target runtime
	 * environment.
	 */
	lib?: string[];
	/**
	 * Do not truncate error messages.
	 */
	noErrorTruncation?: boolean;
	/**
	 * Enable error reporting for fallthrough cases in switch statements.
	 */
	noFallthroughCasesInSwitch?: boolean;
	/**
	 * Enable error reporting for expressions and declarations with an implied `any` type.
	 */
	noImplicitAny?: boolean;
	/**
	 * Ensure overriding members in derived classes are marked with an override modifier.
	 */
	noImplicitOverride?: boolean;
	/**
	 * Enable error reporting for codepaths that do not explicitly return in a function.
	 */
	noImplicitReturns?: boolean;
	/**
	 * Enable error reporting when `this` is given the type `any`.
	 */
	noImplicitThis?: boolean;
	/**
	 * Enforces using indexed accessors for keys declared using an indexed type.
	 */
	noPropertyAccessFromIndexSignature?: boolean;
	/**
	 * Add `undefined` to a type when accessed using an index.
	 */
	noUncheckedIndexedAccess?: boolean;
	/**
	 * Enable error reporting when a local variables aren't read.
	 */
	noUnusedLocals?: boolean;
	/**
	 * Raise an error when a function parameter isn't read
	 */
	noUnusedParameters?: boolean;
	/**
	 * Declare many “virtual” directories acting as a single root.
	 */
	rootDirs?: string[];
	/**
	 * Enable all strict type checking options.
	 */
	strict?: boolean;
	/**
	 * Check that the arguments for `bind`, `call`, and `apply` methods match the original
	 * function.
	 */
	strictBindCallApply?: boolean;
	/**
	 * Built-in iterators are instantiated with a `TReturn` type of undefined instead of `any`.
	 */
	strictBuiltinIteratorReturn?: boolean;
	/**
	 * When assigning functions, check to ensure parameters and the return values are
	 * subtype-compatible.
	 */
	strictFunctionTypes?: boolean;
	/**
	 * When type checking, take into account `null` and `undefined`.
	 */
	strictNullChecks?: boolean;
	/**
	 * Check for class properties that are declared but not set in the constructor.
	 */
	strictPropertyInitialization?: boolean;
	/**
	 * Specify type package names to be included without being referenced in a source file.
	 */
	types?: string[];
	/**
	 * Default catch clause variables as `unknown` instead of `any`.
	 */
	useUnknownInCatchVariables?: boolean;
	/**
	 * Do not transform or elide any imports or exports not marked as type-only, ensuring they
	 * are written in the output file's format based on the 'module' setting.
	 */
	verbatimModuleSyntax?: boolean;
}

/**
 * Specify what JSX code is generated.
 */
export type JSX =
	| "preserve"
	| "react"
	| "react-jsx"
	| "react-jsxdev"
	| "react-native"
	| "precompile";

/**
 * Configuration for formatter
 */
export interface Fmt {
	/**
	 * The position of opening braces for blocks in JavaScript and TypeScript.
	 */
	bracePosition?: BracePositionEnum;
	/**
	 * List of files, directories or globs that will not be formatted.
	 */
	exclude?: string[];
	/**
	 * List of files, directories or globs that will be formatted.
	 */
	include?: string[];
	/**
	 * The number of characters for an indent.
	 */
	indentWidth?: number;
	/**
	 * JSX-specific formatting options.
	 */
	jsx?: {
		/**
		 * If the end angle bracket of a jsx open element or self closing element should be on the
		 * same or next line when the attributes span multiple lines.
		 */
		bracketPosition?: JSXBracketPositionEnum;
		/**
		 * Forces newlines surrounding the content of JSX elements.
		 */
		forceNewLineSurroundingContent?: boolean;
		/**
		 * Surrounds the top-most JSX element or fragment in parentheses when it spans multiple
		 * lines.
		 */
		multiLineParens?: JSXMultiLineParens;
	};
	/**
	 * The width of a line the printer will try to stay under. Note that the printer may exceed
	 * this width in certain cases.
	 */
	lineWidth?: number;
	/**
	 * The newline character to use.
	 */
	newLineKind?: NewLineKind;
	/**
	 * Where to place the next control flow within a control flow statement in JavaScript and
	 * TypeScript.
	 */
	nextControlFlowPosition?: JSXBracketPositionEnum;
	/**
	 * Where to place the operator for expressions that span multiple lines in JavaScript and
	 * TypeScript.
	 */
	operatorPosition?: JSXBracketPositionEnum;
	options?: Options;
	/**
	 * Define how prose should be wrapped in Markdown files.
	 */
	proseWrap?: ProseWrap;
	/**
	 * Change when properties in objects are quoted in JavaScript and TypeScript.
	 */
	quoteProps?: QuoteProps;
	/**
	 * Whether to prefer using semicolons.
	 */
	semiColons?: boolean;
	/**
	 * The position of the body in single body blocks in JavaScript and TypeScript.
	 */
	singleBodyPosition?: BracePositionEnum;
	/**
	 * Whether to use single quote (true) or double quote (false) for quotation.
	 */
	singleQuote?: boolean;
	/**
	 * Whether to place spaces around enclosed expressions in JavaScript and TypeScript.
	 */
	spaceAround?: boolean;
	/**
	 * Whether to add a space surrounding the properties of single line object-like nodes in
	 * JavaScript and TypeScript.
	 */
	spaceSurroundingProperties?: boolean;
	/**
	 * Whether to add trailing commas in JavaScript and TypeScript.
	 */
	trailingCommas?: TrailingCommas;
	/**
	 * Options for type literals.
	 */
	typeLiteral?: {
		/**
		 * The kind of separator to use in type literals.
		 */
		separatorKind?: TypeLiteralSeparatorKind;
	};
	/**
	 * Whether to use braces for if statements, for statements, and while statements in
	 * JavaScript and TypeScript.
	 */
	useBraces?: UseBraces;
	/**
	 * Whether to use tabs (true) or spaces (false) for indentation.
	 */
	useTabs?: boolean;
}

/**
 * The position of opening braces for blocks in JavaScript and TypeScript.
 *
 * The position of the body in single body blocks in JavaScript and TypeScript.
 */
export type BracePositionEnum = "maintain" | "sameLine" | "nextLine" | "sameLineUnlessHanging";

/**
 * If the end angle bracket of a jsx open element or self closing element should be on the
 * same or next line when the attributes span multiple lines.
 *
 * Where to place the next control flow within a control flow statement in JavaScript and
 * TypeScript.
 *
 * Where to place the operator for expressions that span multiple lines in JavaScript and
 * TypeScript.
 */
export type JSXBracketPositionEnum = "maintain" | "sameLine" | "nextLine";

/**
 * Surrounds the top-most JSX element or fragment in parentheses when it spans multiple
 * lines.
 */
export type JSXMultiLineParens = "never" | "prefer" | "always";

/**
 * The newline character to use.
 */
export type NewLineKind = "auto" | "crlf" | "lf" | "system";

export interface Options {
	/**
	 * The number of characters for an indent.
	 */
	indentWidth?: number;
	/**
	 * The width of a line the printer will try to stay under. Note that the printer may exceed
	 * this width in certain cases.
	 */
	lineWidth?: number;
	/**
	 * Define how prose should be wrapped in Markdown files.
	 */
	proseWrap?: ProseWrap;
	/**
	 * Whether to prefer using semicolons.
	 */
	semiColons?: boolean;
	/**
	 * Whether to use single quote (true) or double quote (false) for quotation.
	 */
	singleQuote?: boolean;
	/**
	 * Whether to use tabs (true) or spaces (false) for indentation.
	 */
	useTabs?: boolean;
}

/**
 * Define how prose should be wrapped in Markdown files.
 */
export type ProseWrap = "always" | "never" | "preserve";

/**
 * Change when properties in objects are quoted in JavaScript and TypeScript.
 */
export type QuoteProps = "asNeeded" | "consistent" | "preserve";

/**
 * Whether to add trailing commas in JavaScript and TypeScript.
 */
export type TrailingCommas = "never" | "always" | "onlyMultiLine";

/**
 * The kind of separator to use in type literals.
 */
export type TypeLiteralSeparatorKind = "comma" | "semiColon";

/**
 * Whether to use braces for if statements, for statements, and while statements in
 * JavaScript and TypeScript.
 */
export type UseBraces = "maintain" | "whenNotSingleLine" | "always" | "preferNone";

/**
 * Configuration for linter
 */
export interface Lint {
	/**
	 * List of files, directories or globs that will not be linted.
	 */
	exclude?: string[];
	/**
	 * List of files, directories or globs that will be linted.
	 */
	include?: string[];
	/**
	 * UNSTABLE: List of plugins to load. These can be paths, npm or jsr specifiers
	 */
	plugins?: string[];
	/**
	 * The default report format to use when linting
	 */
	report?: Report;
	rules?: Rules;
}

/**
 * The default report format to use when linting
 */
export type Report = "pretty" | "json" | "compact";

export interface Rules {
	/**
	 * List of rule names that will be excluded from configured tag sets. If the same rule is in
	 * `include` it will be run.
	 */
	exclude?: string[];
	/**
	 * List of rule names that will be run. Even if the same rule is in `exclude` it will be run.
	 */
	include?: string[];
	/**
	 * List of tag names that will be run. Empty list disables all tags and will only use rules
	 * from `include`.
	 */
	tags?: LintTagsV1[];
}

export type LintTagsV1 = "fresh" | "jsr" | "jsx" | "react" | "recommended";

export interface LockObject {
	/**
	 * Whether to exit with an error if lock file is out of date.
	 */
	frozen?: boolean;
	/**
	 * The path to use for the lock file.
	 */
	path?: string;
}

/**
 * Sets the node_modules management mode for npm packages. Alternatively, use the
 * `--node-modules-dir=<MODE>` flag. Requires Deno 2.0-rc.1 or later.
 */
export type NodeModulesDirEnum = "auto" | "manual" | "none";

/**
 * Configuration for deno publish
 */
export interface Publish {
	/**
	 * List of files, directories or globs that will be excluded from the published package.
	 */
	exclude?: string[];
	/**
	 * List of files, directories or globs that will be included in the published package.
	 */
	include?: string[];
}

/**
 * Configuration for deno task
 */
export type Tasks = {};

/**
 * Configuration for deno test
 */
export interface Test {
	/**
	 * List of files, directories or globs that will not be searched for tests.
	 */
	exclude?: string[];
	/**
	 * List of files, directories or globs that will be searched for tests.
	 */
	include?: string[];
}

export interface WorkspaceObject {
	/**
	 * The members of this workspace.
	 */
	members?: string[];
}
