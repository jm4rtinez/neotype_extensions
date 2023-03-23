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
			fc.assert(
				fc.property(
					fc.uniqueArray(fc.anything()).map((xs) => new Set(xs)),
					fc.uniqueArray(fc.anything()).map((xs) => new Set(xs)),
					(xs, ys) => {
						const result = eq(xs, ys);

						const exp = (() => {
							if (xs.size !== ys.size) {
								return false;
							}
							for (const x of xs) {
								if (!ys.has(x)) {
									return false;
								}
							}
							return true;
						})();

						expect(result).to.equal(exp);
					},
				),
			);
		});

		it("implements a lawful equivalence relation", () => {
			expectLawfulEq(
				fc.uniqueArray(fc.anything()).map((xs) => new Set(xs)),
			);
		});
	});

	describe("#[Semigroup.cmb]", () => {
		it("takes the union of the sets", () => {
			fc.assert(
				fc.property(
					fc.uniqueArray(fc.anything()).map((xs) => new Set(xs)),
					fc.uniqueArray(fc.anything()).map((xs) => new Set(xs)),
					(xs, ys) => {
						const result = cmb(xs, ys);
						const exp = new Set([...xs, ...ys]);

						expect(result.size).to.equal(exp.size);
						for (const x of result) {
							expect(exp.has(x)).to.be.true;
						}
					},
				),
			);
		});

		it("implements a lawful semigroup", () => {
			expectLawfulSemigroup(
				fc.uniqueArray(fc.string()).map((xs) => new Set(xs)),
			);
		});
	});
});

describe("ReadonlySet", () => {
	describe("#[Eq.eq]", () => {
		it("compares the readonly set and non-readonly set to each other", () => {
			const xs: ReadonlySet<unknown> = new Set();
			const ys: Set<unknown> = new Set();
			eq(xs, xs);
			eq(xs, ys);
			eq(ys, xs);
		});
	});

	describe("#[Semigroup.cmb]", () => {
		it("combines the readonly set and non-readonly set with each other", () => {
			const xs: ReadonlySet<unknown> = new Set();
			const ys: Set<unknown> = new Set();
			cmb(xs, xs);
			cmb(xs, ys);
			cmb(ys, xs);
		});
	});
});
