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
import "./map.js";
import "./string.js";

describe("Map", () => {
	describe("#[Eq.eq]", () => {
		it("compares the keys strictly and compares the values using their Eq implementation", () => {
			const property = fc.property(
				fc
					.uniqueArray(fc.tuple(fc.anything(), fc.string()))
					.map((entries) => new Map(entries)),
				fc
					.uniqueArray(fc.tuple(fc.anything(), fc.string()))
					.map((entries) => new Map(entries)),
				(lhs, rhs) => {
					const result = eq(lhs, rhs);

					const expected = (() => {
						if (lhs.size !== rhs.size) {
							return false;
						}
						for (const [key, val] of lhs.entries()) {
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							if (!(rhs.has(key) && eq(rhs.get(key)!, val))) {
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
				fc
					.uniqueArray(fc.tuple(fc.anything(), fc.string()))
					.map((entries) => new Map(entries)),
			);
		});
	});

	describe("#[Semigroup.cmb]", () => {
		it("takes the union of the maps", () => {
			const property = fc.property(
				fc
					.uniqueArray(fc.tuple(fc.anything(), fc.anything()))
					.map((entries) => new Map(entries)),
				fc
					.uniqueArray(fc.tuple(fc.anything(), fc.anything()))
					.map((entries) => new Map(entries)),
				(lhs, rhs) => {
					const result = cmb(lhs, rhs);
					const expected = new Map([...lhs, ...rhs]);

					expect(result.size).to.equal(expected.size);
					for (const [key, val] of result) {
						expect(expected.has(key)).to.be.true;
						expect(expected.get(key)).to.deep.equal(val);
					}
				},
			);
			fc.assert(property);
		});

		it("implements a lawful semigroup", () => {
			expectLawfulSemigroup(
				fc
					.uniqueArray(fc.tuple(fc.anything(), fc.string()))
					.map((entries) => new Map(entries)),
			);
		});
	});
});

describe("ReadonlyMap", () => {
	describe("#[Eq.eq]", () => {
		it("compares the readonly map and non-readonly map to each other", () => {
			const readonly: ReadonlyMap<unknown, string> = new Map();
			const writable: Map<unknown, string> = new Map();
			eq(readonly, readonly);
			eq(readonly, writable);
			eq(writable, readonly);
		});
	});

	describe("#[Semigroup.cmb]", () => {
		it("combines the readonly map and non-readonly map with each other", () => {
			const readonly: ReadonlyMap<unknown, unknown> = new Map();
			const writable: Map<unknown, unknown> = new Map();
			cmb(readonly, readonly);
			cmb(readonly, writable);
			cmb(writable, readonly);
		});
	});
});
