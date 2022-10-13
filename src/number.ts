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
 * Augmentations for the `number` type.
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/instances/number.js";
 * ```
 *
 * ## Comparing `number`
 *
 * `number` implements `Eq` and `Ord`.
 *
 * - Two numbers are equal if they are strictly equal using `===`.
 * - Numbers are ordered from least to greatest.
 *
 * @module
 */

import { Eq, Ord, Ordering } from "@neotype/prelude/cmp.js";

declare global {
    interface Number {
        [Eq.eq](that: number): boolean;

        [Ord.cmp](that: number): Ordering;
    }
}

Number.prototype[Eq.eq] = function (that: number): boolean {
    return this === that;
};

Number.prototype[Ord.cmp] = function (this: number, that: number): Ordering {
    return Ordering.fromNumber(this - that);
};
