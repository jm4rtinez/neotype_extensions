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
 * Augmentations for the `Set` and `ReadonlySet` types.
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/instances/set.js";
 * ```
 *
 * ## Comparing `Set` and `ReadonlySet`
 *
 * `Set` and `ReadonlySet` implement `Eq`.
 *
 * - Two sets are equal if they are the same size and contain the same values.
 * - Values are compared using strict equality (`===`).
 * - Read-only and non-read-only sets can be compared to each other.
 *
 * ## `Set` and `ReadonlySet` as semigroups
 *
 * `Set` and `ReadonlySet` implement `Semigroup`.
 *
 * - Sets are combined by taking their union.
 * - Duplicate values are determined using strict equality (`===`).
 * - Read-only and non-read-only sets can be combined with each other.
 * - If either set is read-only, the resulting set will also be read-only.
 *
 * @module
 */

import { Semigroup } from "@neotype/prelude/cmb.js";
import { Eq } from "@neotype/prelude/cmp.js";

declare global {
    interface Set<T> {
        [Eq.eq](that: Set<T>): boolean;
        [Semigroup.cmb](that: Set<T>): Set<T>;
    }

    interface ReadonlySet<T> {
        [Eq.eq](that: ReadonlySet<T>): boolean;
        [Semigroup.cmb](that: ReadonlySet<T>): ReadonlySet<T>;
    }
}

Set.prototype[Eq.eq] = function <T>(this: Set<T>, that: Set<T>): boolean {
    if (this.size !== that.size) {
        return false;
    }
    for (const x of this.values()) {
        if (!that.has(x)) {
            return false;
        }
    }
    return true;
};

Set.prototype[Semigroup.cmb] = function <T>(
    this: Set<T>,
    that: Set<T>,
): Set<T> {
    return new Set(
        function* (this: Set<T>) {
            yield* this;
            yield* that;
        }.call(this),
    );
};
