/*
 * Copyright 2022 Josh Martinez
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
 * Augmentations for the `BigUint64Array` type.
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/instances/biguint64_array.js";
 * ```
 *
 * ## Comparing `BigUint64Array`
 *
 * `BigUint64Array` implements `Eq` and `Ord`.
 *
 * -   Two BigUint64Arrays are equal when they are the same length and their
 *     elements are strictly equal using `===`.
 * -   BigUint64Arrays are ordered lexicographically, and their elements are
 *     ordered from least to greatest.
 *
 * ## `BigUint64Array` as a semigroup
 *
 * `BigUint64Array` implements `Semigroup`. BigUint64Arrays are combined using
 * concatenation. The combination will allocate memory equivalent to the sum of
 * the combined arrays' sizes.
 *
 * @module
 */

import { Semigroup } from "@neotype/prelude/cmb.js";
import { Eq, icmpBy, ieqBy, Ord, Ordering } from "@neotype/prelude/cmp.js";

declare global {
    interface BigUint64Array {
        [Eq.eq](that: BigUint64Array): boolean;

        [Ord.cmp](that: BigUint64Array): Ordering;

        [Semigroup.cmb](that: BigUint64Array): BigUint64Array;
    }
}

BigUint64Array.prototype[Eq.eq] = function (that: BigUint64Array): boolean {
    return ieqBy(this, that, (x, y) => x === y);
};

BigUint64Array.prototype[Ord.cmp] = function (that: BigUint64Array): Ordering {
    return icmpBy(this, that, (x, y) => Ordering.fromNumber(x - y));
};

BigUint64Array.prototype[Semigroup.cmb] = function (
    that: BigUint64Array,
): BigUint64Array {
    const result = new BigUint64Array(this.length + that.length);
    result.set(this);
    result.set(that, this.length);
    return result;
};
