# Neotype Instances

Default implementations for [Neotype] equivalence relations, total orders, and
semigroups for built-in JavaScript objects

## Features

Neotype Instances provides default implementations for the Neotype `Eq`, `Ord`,
and `Semigroup` interfaces for built-in JavaScript objects and their
corresponding TypeScript definitions, including:

-   Primitives: `boolean`, `number`, `bigint`, `string`, and `symbol`
-   Generic containers:
    -   `Array` and `ReadonlyArray`
    -   Tuple literals and `readonly` tuple literals
    -   `Set` and `ReadonlySet`
    -   `Map` and `ReadonlyMap`
-   Dates, Promises, and Functions
-   Typed arrays

The specific implementations are as follows:

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

Neotype Instances is available on NPM.

```sh
npm install @neotype/instances
```

## Working with modules

This library provides a suite of [ES6 modules]. A `.js` suffix is required in
all import statements. There are no exports. When imported, each module will
augment a global object.

```ts
import "@neotype/instances/number.js";
import "@neotype/instances/string.js";
import "@neotype/instances/boolean.js";
import "@neotype/instances/promise.js";
// etc.
```

See each module's documentation for recommended import practices.

[neotype]: https://github.com/jm4rtinez/neotype_prelude
[es6 modules]:
    https://exploringjs.com/es6/ch_modules.html#sec_basics-of-es6-modules
