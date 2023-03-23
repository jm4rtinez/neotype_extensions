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
 * Augmentations for the `Uint8ClampedArray` type.
 *
 * @remarks
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/extensions/uint8_clamped_array.js";
 * ```
 *
 * ## Comparing `Uint8ClampedArray`
 *
 * `Uint8ClampedArray` implements `Eq` and `Ord`.
 *
 * -   Two `Uint8ClampedArray` values are equal when they are the same length
 *     and their respective elements are strictly equal.
 * -   `Uint8ClampedArray` values are compared lexicographically from left to
 *     right, and their elements are ordered from least to greatest.
 *
 * ## `Uint8ClampedArray` as a semigroup
 *
 * `Uint8ClampedArray` implements `Semigroup`. When combined, `Int8ClampedArray`
 * values are are concatenated from left to right.
 *
 * @module
 */

import { Semigroup } from "@neotype/prelude/cmb.js";
import { Eq, Ord, Ordering, icmpBy, ieqBy } from "@neotype/prelude/cmp.js";

declare global {
    interface Uint8ClampedArray {
        [Eq.eq](that: Uint8ClampedArray): boolean;

        [Ord.cmp](that: Uint8ClampedArray): Ordering;

        [Semigroup.cmb](that: Uint8ClampedArray): Uint8ClampedArray;
    }
}

Uint8ClampedArray.prototype[Eq.eq] = function (
    that: Uint8ClampedArray,
): boolean {
    return ieqBy(this, that, (lhs, rhs) => lhs === rhs);
};

Uint8ClampedArray.prototype[Ord.cmp] = function (
    that: Uint8ClampedArray,
): Ordering {
    return icmpBy(this, that, (lhs, rhs) => Ordering.fromNumber(lhs - rhs));
};

Uint8ClampedArray.prototype[Semigroup.cmb] = function (
    that: Uint8ClampedArray,
): Uint8ClampedArray {
    const result = new Uint8ClampedArray(this.length + that.length);
    result.set(this);
    result.set(that, this.length);
    return result;
};
