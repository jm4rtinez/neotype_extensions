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
 * Augmentations for the `Uint16Array` type.
 *
 * @remarks
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/extensions/uint16_array.js";
 * ```
 *
 * ## Comparing `Uint16Array`
 *
 * `Uint16Array` implements `Eq` and `Ord`.
 *
 * -   Two `Uint16Array` values are equal when they are the same length and
 *     their respective elements are strictly equal.
 * -   `Uint16Array` values are compared lexicographically from left to right,
 *     and their elements are ordered from least to greatest.
 *
 * ## `Uint16Array` as a semigroup
 *
 * `Uint16Array` implements `Semigroup`. When combined, `Uint16Array` values are
 * are concatenated from left to right.
 *
 * @module
 */

import { Semigroup } from "@neotype/prelude/cmb.js";
import { Eq, icmpBy, ieqBy, Ord, Ordering } from "@neotype/prelude/cmp.js";

declare global {
    interface Uint16Array {
        [Eq.eq](that: Uint16Array): boolean;

        [Ord.cmp](that: Uint16Array): Ordering;

        [Semigroup.cmb](that: Uint16Array): Uint16Array;
    }
}

Uint16Array.prototype[Eq.eq] = function (that: Uint16Array): boolean {
    return ieqBy(this, that, (lhs, rhs) => lhs === rhs);
};

Uint16Array.prototype[Ord.cmp] = function (that: Uint16Array): Ordering {
    return icmpBy(this, that, (lhs, rhs) => Ordering.fromNumber(lhs - rhs));
};

Uint16Array.prototype[Semigroup.cmb] = function (
    that: Uint16Array,
): Uint16Array {
    const result = new Uint16Array(this.length + that.length);
    result.set(this);
    result.set(that, this.length);
    return result;
};
