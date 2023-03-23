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
 * Augmentations for the `Function` type.
 *
 * @remarks
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/extensions/function.js";
 * ```
 *
 * ## `Function` as a semigroup
 *
 * `Function` has the following behavior as a semigroup:
 *
 * -   A function `<TArgs extends unknown[], T>(...args: TArgs) => T` implements
 *     `Semigroup` when `T` implements `Semigroup`.
 * -   Combining two functions returns a new function that, when applied,
 *     applies the original functions from left to right and combines their
 *     results.
 *
 * @module
 */

import { Semigroup, cmb } from "@neotype/prelude/cmb.js";

declare global {
    interface Function {
        [Semigroup.cmb]<TArgs extends unknown[], T extends Semigroup<T>>(
            this: (...args: TArgs) => T,
            that: (...args: TArgs) => T,
        ): (...args: TArgs) => T;
    }
}

Function.prototype[Semigroup.cmb] = function <
    TArgs extends unknown[],
    T extends Semigroup<T>,
>(
    this: (...args: TArgs) => T,
    that: (...args: TArgs) => T,
): (...args: TArgs) => T {
    return (...args) => cmb(this(...args), that(...args));
};
