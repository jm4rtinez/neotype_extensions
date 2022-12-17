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
 * Augmentations for the `bigint` type.
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/instances/bigint.js";
 * ```
 *
 * ## Comparing `bigint`
 *
 * `bigint` implements `Eq` and `Ord`.
 *
 * -   Two bigints are equal if they are strictly equal using `===`.
 * -   Bigints are ordered from least to greatest.
 *
 * @module
 */

import { Eq, Ord, Ordering } from "@neotype/prelude/cmp.js";

declare global {
    interface BigInt {
        [Eq.eq](that: bigint): boolean;

        [Ord.cmp](that: bigint): Ordering;
    }
}

BigInt.prototype[Eq.eq] = function (that: bigint): boolean {
    return this === that;
};

BigInt.prototype[Ord.cmp] = function (this: bigint, that: bigint): Ordering {
    return Ordering.fromNumber(this - that);
};
