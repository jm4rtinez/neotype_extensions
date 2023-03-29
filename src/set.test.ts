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

import { cmb } from "@neotype/prelude/cmb.js";
import { eq } from "@neotype/prelude/cmp.js";
import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import { expectLawfulEq, expectLawfulSemigroup } from "./_test/utils.js";
import "./set.js";

describe("Set", () => {
	describe("#[Eq.eq]", () => {
		it("compares the elements strictly", () => {
			const property = fc.property(
				fc.uniqueArray(fc.anything()).map((elems) => new Set(elems)),
				fc.uniqueArray(fc.anything()).map((elems) => new Set(elems)),
				(lhs, rhs) => {
					const result = eq(lhs, rhs);

					const expected = (() => {
						if (lhs.size !== rhs.size) {
							return false;
						}
						for (const val of lhs) {
							if (!rhs.has(val)) {
								return false;
							}
						}
						return true;
					})();

					expect(result).to.equal(expected);
				},
			);
			fc.assert(property);
		});

		it("implements a lawful equivalence relation", () => {
			expectLawfulEq(
				fc.uniqueArray(fc.anything()).map((elems) => new Set(elems)),
			);
		});
	});

	describe("#[Semigroup.cmb]", () => {
		it("takes the union of the sets", () => {
			const property = fc.property(
				fc.uniqueArray(fc.anything()).map((elems) => new Set(elems)),
				fc.uniqueArray(fc.anything()).map((elems) => new Set(elems)),
				(lhs, rhs) => {
					const result = cmb(lhs, rhs);
					const expected = new Set([...lhs, ...rhs]);

					expect(result.size).to.equal(expected.size);
					for (const val of result) {
						expect(expected.has(val)).to.be.true;
					}
				},
			);
			fc.assert(property);
		});

		it("implements a lawful semigroup", () => {
			expectLawfulSemigroup(
				fc.uniqueArray(fc.string()).map((elems) => new Set(elems)),
			);
		});
	});
});

describe("ReadonlySet", () => {
	describe("#[Eq.eq]", () => {
		it("compares the readonly set and non-readonly set to each other", () => {
			const readonly: ReadonlySet<unknown> = new Set();
			const writable: Set<unknown> = new Set();
			eq(readonly, readonly);
			eq(readonly, writable);
			eq(writable, readonly);
		});
	});

	describe("#[Semigroup.cmb]", () => {
		it("combines the readonly set and non-readonly set with each other", () => {
			const readonly: ReadonlySet<unknown> = new Set();
			const writable: Set<unknown> = new Set();
			cmb(readonly, readonly);
			cmb(readonly, writable);
			cmb(writable, readonly);
		});
	});
});
