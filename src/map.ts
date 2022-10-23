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
 * Augmentations for the `Map` and `ReadonlyMap` types.
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/instances/map.js";
 * ```
 *
 * ## Comparing `Map` and `ReadonlyMap`
 *
 * `Map` and `ReadonlyMap` implement `Eq`.
 *
 * -   Two maps are equal if they are the same size and contain the same
 *     key-value pairs.
 * -   Keys and values are compared using strict equality (`===`).
 * -   Read-only and non-read-only maps can be compared to each other.
 *
 * ## `Map` and `ReadonlyMap` as semigroups
 *
 * `Map` and `ReadonlyMap` implement `Semigroup`.
 *
 * -   Maps are combined by taking their union.
 * -   Duplicate values are determined using strict equality (`===`).
 * -   If a key is mapped to two different values, only the right-hand map's
 *     value is retained.
 * -   Read-only and non-read-only maps can be combined with each other.
 * -   If either map is read-only, the resulting map will also be read-only.
 *
 * @module
 */

import { Semigroup } from "@neotype/prelude/cmb.js";
import { Eq } from "@neotype/prelude/cmp.js";

declare global {
    interface Map<K, V> {
        [Eq.eq](that: Map<K, V>): boolean;

        [Semigroup.cmb](that: Map<K, V>): Map<K, V>;
    }

    interface ReadonlyMap<K, V> {
        [Eq.eq](that: ReadonlyMap<K, V>): boolean;

        [Semigroup.cmb](that: ReadonlyMap<K, V>): ReadonlyMap<K, V>;
    }
}

Map.prototype[Eq.eq] = function <K, V>(
    this: Map<K, V>,
    that: Map<K, V>,
): boolean {
    if (this.size !== that.size) {
        return false;
    }
    for (const [kx, x] of this.entries()) {
        if (!(that.has(kx) && that.get(kx) === x)) {
            return false;
        }
    }
    return true;
};

Map.prototype[Semigroup.cmb] = function <K, V>(
    this: Map<K, V>,
    that: Map<K, V>,
): Map<K, V> {
    return new Map(
        (function* (self: Map<K, V>) {
            yield* self;
            yield* that;
        })(this),
    );
};
