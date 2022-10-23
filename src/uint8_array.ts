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
 * Augmentations for the `Uint8Array` type.
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/instances/uint8_array.js";
 * ```
 *
 * ## Comparing `Uint8Array`
 *
 * `Uint8Array` implements `Eq` and `Ord`.
 *
 * -   Two Uint8Arrays are equal when they are the same length and their
 *     elements are strictly equal using `===`.
 * -   Uint8Arrays are ordered lexicographically, and their elements are ordered
 *     from least to greatest.
 *
 * ## `Uint8Array` as a semigroup
 *
 * `Uint8Array` implements `Semigroup`. Uint8Arrays are combined using
 * concatenation. The combination will allocate memory equivalent to the sum of
 * the combined arrays' sizes.
 *
 * @module
 */

import { Semigroup } from "@neotype/prelude/cmb.js";
import { Eq, icmpBy, ieqBy, Ord, Ordering } from "@neotype/prelude/cmp.js";

declare global {
    interface Uint8Array {
        [Eq.eq](that: Uint8Array): boolean;

        [Ord.cmp](that: Uint8Array): Ordering;

        [Semigroup.cmb](that: Uint8Array): Uint8Array;
    }
}

Uint8Array.prototype[Eq.eq] = function (that: Uint8Array): boolean {
    return ieqBy(this, that, (x, y) => x === y);
};

Uint8Array.prototype[Ord.cmp] = function (that: Uint8Array): Ordering {
    return icmpBy(this, that, (x, y) => Ordering.fromNumber(x - y));
};

Uint8Array.prototype[Semigroup.cmb] = function (that: Uint8Array): Uint8Array {
    const result = new Uint8Array(this.length + that.length);
    result.set(this);
    result.set(that, this.length);
    return result;
};
