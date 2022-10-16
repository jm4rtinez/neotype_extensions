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
 * Augmentations for the `BigInt64Array` type.
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/instances/bigint64_array.js";
 * ```
 *
 * ## Comparing `BigInt64Array`
 *
 * `BigInt64Array` implements `Eq` and `Ord`.
 *
 * - Two BigInt64Arrays are equal when they are the same length and their
 *   elements are strictly equal using `===`.
 * - BigInt64Arrays are ordered lexicographically, and their elements are
 *   ordered from least to greatest.
 *
 * ## `BigInt64Array` as a semigroup
 *
 * `BigInt64Array` implements `Semigroup`. BigInt64Arrays are combined using
 * concatenation. The combination will allocate memory equivalent to the sum of
 * the combined arrays' sizes.
 *
 * @module
 */

import { Semigroup } from "@neotype/prelude/cmb.js";
import { Eq, icmpBy, ieqBy, Ord, Ordering } from "@neotype/prelude/cmp.js";

declare global {
    interface BigInt64Array {
        [Eq.eq](that: BigInt64Array): boolean;

        [Ord.cmp](that: BigInt64Array): Ordering;

        [Semigroup.cmb](that: BigInt64Array): BigInt64Array;
    }
}

BigInt64Array.prototype[Eq.eq] = function (that: BigInt64Array): boolean {
    return ieqBy(this, that, (x, y) => x === y);
};

BigInt64Array.prototype[Ord.cmp] = function (that: BigInt64Array): Ordering {
    return icmpBy(this, that, (x, y) => {
        const n = x - y;
        if (n < 0) {
            return Ordering.less;
        }
        if (n > 0) {
            return Ordering.greater;
        }
        return Ordering.equal;
    });
};

BigInt64Array.prototype[Semigroup.cmb] = function (
    that: BigInt64Array,
): BigInt64Array {
    const result = new BigInt64Array(this.length + that.length);
    result.set(this);
    result.set(that, this.length);
    return result;
};
