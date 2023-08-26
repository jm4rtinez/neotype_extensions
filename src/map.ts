/*
 * Copyright 2022-2023 Joshua Martinez-Maes
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Augmentations for the `Map` and `ReadonlyMap` types.
 *
 * @remarks
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/extensions/map.js";
 * ```
 *
 * ## Comparing `Map` and `ReadonlyMap`
 *
 * `Map` and `ReadonlyMap` have the following behavior as an equivalence
 * relation:
 *
 * -   A `Map<K, V>` or a `ReadonlyMap<K, V>` implements `Eq` when `V`
 *     implements `Eq`.
 * -   Two maps are equal if:
 *     1.   they are the same size;
 *     2.   they contain the same keys (compared strictly); and
 *     3.   for each key, the corresponding values are equal.
 * -   Read-only and non-read-only maps can be compared to each other.
 *
 * ## `Map` and `ReadonlyMap` as semigroups
 *
 * `Map` and `ReadonlyMap` implement `Semigroup`.
 *
 * -   Maps are combined by taking their union.
 * -   If a key is mapped to two different values, only the right-hand map's
 *     value is retained.
 * -   Read-only and non-read-only maps can be combined with each other.
 * -   If either map is read-only, the resulting map will also be read-only.
 *
 * @module
 */

import { Semigroup } from "@neotype/prelude/cmb.js";
import { Eq, eq } from "@neotype/prelude/cmp.js";

declare global {
	interface Map<K, V> {
		[Eq.eq]<V extends Eq<V>>(this: Map<K, V>, that: Map<K, V>): boolean;

		[Semigroup.cmb](that: Map<K, V>): Map<K, V>;
	}

	interface ReadonlyMap<K, V> {
		[Eq.eq]<V extends Eq<V>>(
			this: ReadonlyMap<K, V>,
			that: ReadonlyMap<K, V>,
		): boolean;

		[Semigroup.cmb](that: ReadonlyMap<K, V>): ReadonlyMap<K, V>;
	}
}

Map.prototype[Eq.eq] = function <K, V extends Eq<V>>(
	this: Map<K, V>,
	that: Map<K, V>,
): boolean {
	if (this.size !== that.size) {
		return false;
	}
	for (const [key, val] of this.entries()) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		if (!(that.has(key) && eq(that.get(key)!, val))) {
			return false;
		}
	}
	return true;
};

Map.prototype[Semigroup.cmb] = function <K, V>(
	this: Map<K, V>,
	that: Map<K, V>,
): Map<K, V> {
	return new Map(
		(function* (self: Map<K, V>) {
			yield* self;
			yield* that;
		})(this),
	);
};
