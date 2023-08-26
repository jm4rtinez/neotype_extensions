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
 * Augmentations for the `BigInt64Array` type.
 *
 * @remarks
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/extensions/big_int64_array.js";
 * ```
 *
 * ## Comparing `BigInt64Array`
 *
 * `BigInt64Array` implements `Eq` and `Ord`.
 *
 * -   Two `BigInt64Array` values are equal when they are the same length and
 *     their respective elements are strictly equal.
 * -   `BigInt64Array` values are compared lexicographically from left to right,
 *     and their elements are ordered from least to greatest.
 *
 * ## `BigInt64Array` as a semigroup
 *
 * `BigInt64Array` implements `Semigroup`. When combined, `BigInt64Array` values
 * are concatenated from left to right.
 *
 * @module
 */

import { Semigroup } from "@neotype/prelude/cmb.js";
import { Eq, Ord, Ordering, icmpBy, ieqBy } from "@neotype/prelude/cmp.js";

declare global {
	interface BigInt64Array {
		[Eq.eq](that: BigInt64Array): boolean;

		[Ord.cmp](that: BigInt64Array): Ordering;

		[Semigroup.cmb](that: BigInt64Array): BigInt64Array;
	}
}

BigInt64Array.prototype[Eq.eq] = function (that: BigInt64Array): boolean {
	return ieqBy(this, that, (lhs, rhs) => lhs === rhs);
};

BigInt64Array.prototype[Ord.cmp] = function (that: BigInt64Array): Ordering {
	return icmpBy(this, that, (lhs, rhs) => Ordering.fromNumber(lhs - rhs));
};

BigInt64Array.prototype[Semigroup.cmb] = function (
	that: BigInt64Array,
): BigInt64Array {
	const result = new BigInt64Array(this.length + that.length);
	result.set(this);
	result.set(that, this.length);
	return result;
};
