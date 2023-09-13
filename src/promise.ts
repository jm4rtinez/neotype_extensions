/*
 * Copyright 2022-2023 Joshua Martinez-Maes
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
 * Augmentations for promises.
 *
 * @remarks
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/extensions/promise.js";
 * ```
 *
 * ## Combining promises as a semigroup
 *
 * Promises have the following behavior as a semigroup:
 *
 * -   A `Promise<T>` implements `Semigroup` when `T` implements `Semigroup`.
 * -   When combined, promises are awaited concurrently and their results are
 *     combined and fulfilled in a new promise.
 *
 * @module
 */

import { Semigroup, cmb } from "@neotype/prelude/cmb.js";

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
	return this.then((lhs) => that.then((rhs) => cmb(lhs, rhs)));
};
