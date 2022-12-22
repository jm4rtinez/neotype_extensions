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
 * Augmentations for the `Int8Array` type.
 *
 * @remarks
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/instances/int8_array.js";
 * ```
 *
 * ## Comparing `Int8Array`
 *
 * `Int8Array` implements `Eq` and `Ord`.
 *
 * -   Two `Int8Array` values are equal when they are the same length and their
 *     respective elements are strictly equal.
 * -   `Int8Array` values are compared lexicographically from left to right, and
 *     their elements are ordered from least to greatest.
 *
 * ## `Int8Array` as a semigroup
 *
 * `Int8Array` implements `Semigroup`. When combined, `Int8Array` values are
 * are concatenated from left to right.
 *
 * @module
 */

import { Semigroup } from "@neotype/prelude/cmb.js";
import { Eq, icmpBy, ieqBy, Ord, Ordering } from "@neotype/prelude/cmp.js";

declare global {
    interface Int8Array {
        [Eq.eq](that: Int8Array): boolean;

        [Ord.cmp](that: Int8Array): Ordering;

        [Semigroup.cmb](that: Int8Array): Int8Array;
    }
}

Int8Array.prototype[Eq.eq] = function (that: Int8Array): boolean {
    return ieqBy(this, that, (x, y) => x === y);
};

Int8Array.prototype[Ord.cmp] = function (that: Int8Array): Ordering {
    return icmpBy(this, that, (x, y) => Ordering.fromNumber(x - y));
};

Int8Array.prototype[Semigroup.cmb] = function (that: Int8Array): Int8Array {
    const result = new Int8Array(this.length + that.length);
    result.set(this);
    result.set(that, this.length);
    return result;
};
