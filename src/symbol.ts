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
 * Augmentations for the `Symbol` type.
 *
 * @remarks
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/extensions/symbol.js";
 * ```
 *
 * ## Comparing `Symbol`
 *
 * `Symbol` implements `Eq`. Two `Symbol` values are equal if they are strictly
 * equal.
 *
 * @module
 */

import { Eq } from "@neotype/prelude/cmp.js";

declare global {
	interface Symbol {
		[Eq.eq](that: symbol): boolean;
	}
}

Symbol.prototype[Eq.eq] = function (that: symbol): boolean {
	return this === that;
};
