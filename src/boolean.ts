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
 * Augmentations for the `Boolean` type.
 *
 * @remarks
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/extensions/boolean.js";
 * ```
 *
 * ## Comparing `Boolean`
 *
 * `Boolean` implements `Eq` and `Ord`.
 *
 * -   Two `Boolean` values are equal if they are both `false` or both `true`.
 * -   When ordered, `false` always compares as less than `true`.
 *
 * @module
 */

import { Eq, Ord, Ordering } from "@neotype/prelude/cmp.js";

declare global {
    interface Boolean {
        [Eq.eq](that: boolean): boolean;

        [Ord.cmp](that: boolean): Ordering;
    }
}

Boolean.prototype[Eq.eq] = function (that: boolean): boolean {
    return this === that;
};

Boolean.prototype[Ord.cmp] = function (that: boolean): Ordering {
    return Ordering.fromNumber(Number(this) - Number(that));
};
