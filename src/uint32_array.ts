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
 * Augmentations for the `Uint32Array` type.
 *
 * @remarks
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/extensions/uint32_array.js";
 * ```
 *
 * ## Comparing `Uint32Array`
 *
 * `Uint32Array` implements `Eq` and `Ord`.
 *
 * -   Two `Uint32Array` values are equal when they are the same length and
 *     their respective elements are strictly equal.
 * -   `Uint32Array` values are compared lexicographically from left to right,
 *     and their elements are ordered from least to greatest.
 *
 * ## `Uint32Array` as a semigroup
 *
 * `Uint32Array` implements `Semigroup`. When combined, `Uint32Array` values are
 * are concatenated from left to right.
 *
 * @module
 */

import { Semigroup } from "@neotype/prelude/cmb.js";
import { Eq, Ord, Ordering, icmpBy, ieqBy } from "@neotype/prelude/cmp.js";

declare global {
    interface Uint32Array {
        [Eq.eq](that: Uint32Array): boolean;

        [Ord.cmp](that: Uint32Array): Ordering;

        [Semigroup.cmb](that: Uint32Array): Uint32Array;
    }
}

Uint32Array.prototype[Eq.eq] = function (that: Uint32Array): boolean {
    return ieqBy(this, that, (lhs, rhs) => lhs === rhs);
};

Uint32Array.prototype[Ord.cmp] = function (that: Uint32Array): Ordering {
    return icmpBy(this, that, (lhs, rhs) => Ordering.fromNumber(lhs - rhs));
};

Uint32Array.prototype[Semigroup.cmb] = function (
    that: Uint32Array,
): Uint32Array {
    const result = new Uint32Array(this.length + that.length);
    result.set(this);
    result.set(that, this.length);
    return result;
};
