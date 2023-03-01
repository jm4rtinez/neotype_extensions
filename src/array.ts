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
 * Augmentations for the `Array`, `ReadonlyArray`, tuple literal, and `readonly`
 * tuple literal types.
 *
 * @remarks
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/extensions/array.js";
 * ```
 *
 * ## Comparing `Array`, `ReadonlyArray`, tuple literals, and `readonly` tuple
 * literals
 *
 * `Array`, `ReadonlyArray`, tuple literals, and `readonly` tuple literals have
 * the following behavior as an equivalence relation:
 *
 * -   An `Array<T>` or a `ReadonlyArray<T>` implements `Eq` when `T` implements
 *     `Eq`.
 * -   A tuple or a `readonly` tuple implements `Eq` when each of its elements
 *     implements `Eq`.
 * -   Two arrays or two tuples are equal if they are the same length and their
 *     respective elements are equal.
 * -   Read-only and non-read-only arrays can be compared to each other.
 * -   Read-only and non-read-only tuples can be compared to each other.
 *
 * `Array`, `ReadonlyArray`, tuple literals, and `readonly` tuple literals have
 * the following behavior as a total order:
 *
 * -   An `Array<T>` or a `ReadonlyArray<T>` implements `Ord` when `T`
 *     implements `Ord`.
 * -   A tuple or `readonly` tuple implements `Eq` when each of its elements
 *     implements `Eq`.
 * -   Arrays and tuples are compared lexicographically from left to right.
 * -   Read-only and non-read-only arrays can be compared to each other.
 * -   Read-only and non-read-only tuples can be compared to each other.
 *
 * ## `Array` and `ReadonlyArray` as semigroups
 *
 * `Array` and `ReadonlyArray` have the following behavior as a semigroup:
 *
 * -   When combined, arrays are concatenated from left to right.
 * -   Read-only and non-read-only arrays can be combined with each other.
 * -   If either array is read-only, the returned array will also be read-only.
 *
 * @module
 */

import { Semigroup } from "@neotype/prelude/cmb.js";
import { Eq, icmp, ieq, Ord, type Ordering } from "@neotype/prelude/cmp.js";

declare global {
    interface Array<T> {
        [Eq.eq]<T extends Eq<T>>(this: T[], that: T[]): boolean;

        [Ord.cmp]<T extends Ord<T>>(this: T[], that: T[]): Ordering;

        [Semigroup.cmb](that: T[]): T[];
    }

    interface ReadonlyArray<T> {
        [Eq.eq]<T extends Eq<T>>(
            this: readonly T[],
            that: readonly T[],
        ): boolean;

        [Ord.cmp]<T extends Ord<T>>(
            this: readonly T[],
            that: readonly T[],
        ): Ordering;

        [Semigroup.cmb](that: readonly T[]): T[];
    }
}

Array.prototype[Eq.eq] = function <T extends Eq<T>>(
    this: T[],
    that: T[],
): boolean {
    return ieq(this, that);
};

Array.prototype[Ord.cmp] = function <T extends Ord<T>>(
    this: T[],
    that: T[],
): Ordering {
    return icmp(this, that);
};

Array.prototype[Semigroup.cmb] = function <T>(that: T[]): T[] {
    return [...this, ...that];
};
