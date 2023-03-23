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
 * Augmentations for the `Date` type.
 *
 * @remarks
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/extensions/date.js";
 * ```
 *
 * ## Comparing `Date`
 *
 * `Date` implements `Eq` and `Ord`.
 *
 * -   Two `Date` values are equal if they have the same representation in
 *     milleseconds since the [ECMAScript epoch][epoch].
 * -   `Date` values are ordered from least to greatest according to their
 *     representation in millseconds since the [ECMAScript epoch][epoch].
 *
 * [epoch]:
 *     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#the_ecmascript_epoch_and_timestamps
 *
 * @module
 */

import { Eq, Ord, Ordering } from "@neotype/prelude/cmp.js";

declare global {
	interface Date {
		[Eq.eq](that: Date): boolean;

		[Ord.cmp](that: Date): Ordering;
	}
}

Date.prototype[Eq.eq] = function (that: Date): boolean {
	return this.getTime() === that.getTime();
};

Date.prototype[Ord.cmp] = function (that: Date): Ordering {
	return Ordering.fromNumber(this.getTime() - that.getTime());
};
