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
 * Augmentations for the `Function` type.
 *
 * @remarks
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/instances/function.js";
 * ```
 *
 * ## `Function` as a semigroup
 *
 * `Function` has the following behavior as a semigroup:
 *
 * -   A function `<T extends unknown[], A>(...args: T) => A` implements
 *     `Semigroup` when `A` implements `Semigroup`.
 * -   Combining two functions returns a new function that, when applied,
 *     applies the original functions from left to right and combines their
 *     results.
 *
 * @module
 */

import { cmb, Semigroup } from "@neotype/prelude/cmb.js";

declare global {
    interface Function {
        [Semigroup.cmb]<T extends unknown[], A extends Semigroup<A>>(
            this: (...args: T) => A,
            that: (...args: T) => A,
        ): (...args: T) => A;
    }
}

Function.prototype[Semigroup.cmb] = function <
    T extends unknown[],
    A extends Semigroup<A>,
>(this: (...args: T) => A, that: (...args: T) => A): (...args: T) => A {
    return (...args) => cmb(this(...args), that(...args));
};
