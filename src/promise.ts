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
 * Augmentations for the `Promise` type.
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/instances/promise.js";
 * ```
 *
 * ## `Promise` as a semigroup
 *
 * `Promise` implements `Semigroup` when its generic type implements
 * `Semigroup`. Promises are combined concurrently to return a new Promise that
 * combines their values.
 *
 * @module
 */

import { cmb, Semigroup } from "@neotype/prelude/cmb.js";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Promise<T> {
        [Semigroup.cmb]<T extends Semigroup<T>>(
            this: Promise<T>,
            that: Promise<T>,
        ): Promise<T>;
    }
}

Promise.prototype[Semigroup.cmb] = function <T extends Semigroup<T>>(
    this: Promise<T>,
    that: Promise<T>,
): Promise<T> {
    return this.then((x) => that.then((y) => cmb(x, y)));
};
