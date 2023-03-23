/*
 * Copyright 2022-2023 Josh Martinez
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
 * Augmentations for the `Float32Array` type.
 *
 * @remarks
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/extensions/float32_array.js";
 * ```
 *
 * ## Comparing `Float32Array`
 *
 * `Float32Array` implements `Eq` and `Ord`.
 *
 * -   Two `Float32Array` values are equal when they are the same length and
 *     their respective elements are strictly equal.
 * -   `Float32Array` values are compared lexicographically from left to right,
 *     and their elements are ordered from least to greatest.
 *
 * ## `Float32Array` as a semigroup
 *
 * `Float32Array` implements `Semigroup`. When combined, `Float32Array` values
 * are concatenated from left to right.
 *
 * @module
 */

import { Semigroup } from "@neotype/prelude/cmb.js";
import { Eq, Ord, Ordering, icmpBy, ieqBy } from "@neotype/prelude/cmp.js";

declare global {
    interface Float32Array {
        [Eq.eq](that: Float32Array): boolean;

        [Ord.cmp](that: Float32Array): Ordering;

        [Semigroup.cmb](that: Float32Array): Float32Array;
    }
}

Float32Array.prototype[Eq.eq] = function (that: Float32Array): boolean {
    return ieqBy(this, that, (lhs, rhs) => lhs === rhs);
};

Float32Array.prototype[Ord.cmp] = function (that: Float32Array): Ordering {
    return icmpBy(this, that, (lhs, rhs) => Ordering.fromNumber(lhs - rhs));
};

Float32Array.prototype[Semigroup.cmb] = function (
    that: Float32Array,
): Float32Array {
    const result = new Float32Array(this.length + that.length);
    result.set(this);
    result.set(that, this.length);
    return result;
};
