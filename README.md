# neotype_extensions

_Default implementations for [neotype_prelude] equivalence relations, total_
_orders, and semigroups for built-in JavaScript objects_

## Features

This library provides default implementations for the neotype_prelude `Eq`,
`Ord`, and `Semigroup` interfaces for built-in JavaScript objects and their
corresponding TypeScript definitions, including:

-   Primitives: `boolean`, `number`, `bigint`, `string`, and `symbol`
-   Generic containers:
    -   `Array` and `ReadonlyArray`
    -   Tuple literals and `readonly` tuple literals
    -   `Set` and `ReadonlySet`
    -   `Map` and `ReadonlyMap`
-   Dates, promises, and functions
-   Typed arrays

The specific implementations are:

| Type                     | `Eq` | `Ord` | `Semigroup` |
| ------------------------ | :--: | :---: | :---------: |
| `Array`                  |  ✔   |   ✔   |      ✔      |
| `BigInt`                 |  ✔   |   ✔   |             |
| `BigInt64Array`          |  ✔   |   ✔   |      ✔      |
| `BigUint64Array`         |  ✔   |   ✔   |      ✔      |
| `Boolean`                |  ✔   |   ✔   |             |
| `Date`                   |  ✔   |   ✔   |             |
| `Float32Array`           |  ✔   |   ✔   |      ✔      |
| `Float64Array`           |  ✔   |   ✔   |      ✔      |
| `Function`               |      |       |      ✔      |
| `Int8Array`              |  ✔   |   ✔   |      ✔      |
| `Int16Array`             |  ✔   |   ✔   |      ✔      |
| `Int32Array`             |  ✔   |   ✔   |      ✔      |
| `Map`                    |  ✔   |       |      ✔      |
| `Number`                 |  ✔   |   ✔   |             |
| `Promise`                |      |       |      ✔      |
| `readonly` tuple literal |  ✔   |   ✔   |             |
| `ReadonlyArray`          |  ✔   |   ✔   |      ✔      |
| `ReadonlyMap`            |  ✔   |       |      ✔      |
| `ReadonlySet`            |  ✔   |       |      ✔      |
| `Set`                    |  ✔   |       |      ✔      |
| `String`                 |  ✔   |   ✔   |      ✔      |
| `Symbol`                 |  ✔   |       |             |
| tuple literal            |  ✔   |   ✔   |             |
| `Uint8Array`             |  ✔   |   ✔   |      ✔      |
| `Uint8ClampedArray`      |  ✔   |   ✔   |      ✔      |
| `Uint16Array`            |  ✔   |   ✔   |      ✔      |
| `Uint32Array`            |  ✔   |   ✔   |      ✔      |

## Install

neotype_extensions is available on NPM.

```sh
npm install @neotype/extensions @neotype/prelude
```

## Working with modules

This library provides a suite of [ES6 modules]. A `.js` suffix is required in
all import statements. There are no exports. When imported, each module will
augment a global object.

```ts
import "@neotype/extensions/boolean.js";
import "@neotype/extensions/number.js";
import "@neotype/extensions/promise.js";
import "@neotype/extensions/string.js";
// etc.
```

See each module's documentation for recommended import practices.

[neotype_prelude]: https://github.com/jmartinezmaes/neotype_prelude
[es6 modules]:
	https://exploringjs.com/es6/ch_modules.html#sec_basics-of-es6-modules
