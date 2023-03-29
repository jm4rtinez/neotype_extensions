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
import { Ordering, cmp, eq, icmpBy, ieqBy } from "@neotype/prelude/cmp.js";
import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import {
	expectLawfulEq,
	expectLawfulOrd,
	expectLawfulSemigroup,
} from "./_test/utils.js";
import "./float64_array.js";

describe("Float64Array", () => {
	describe("#[Eq.eq]", () => {
		it("compares the arrays lexicographically", () => {
			fc.assert(
				fc.property(
					fc.float64Array({ noNaN: true }),
					fc.float64Array({ noNaN: true }),
					(lhs, rhs) => {
						expect(eq(lhs, rhs)).to.equal(
							ieqBy(
								lhs,
								rhs,
								(lhsElem, rhsElem) => lhsElem === rhsElem,
							),
						);
					},
				),
			);
		});

		it("implements a lawful equivalence relation", () => {
			expectLawfulEq(fc.float64Array({ noNaN: true }));
		});
	});

	describe("#[Ord.cmp]", () => {
		it("compares the arrays lexicographically", () => {
			fc.assert(
				fc.property(
					fc.float64Array({ noNaN: true }),
					fc.float64Array({ noNaN: true }),
					(lhs, rhs) => {
						expect(cmp(lhs, rhs)).to.equal(
							icmpBy(lhs, rhs, (lhsElem, rhsElem) =>
								Ordering.fromNumber(lhsElem - rhsElem),
							),
						);
					},
				),
			);
		});

		it("implements a lawful total order", () => {
			expectLawfulOrd(fc.float64Array({ noNaN: true }));
		});
	});

	describe("#[Semigroup.cmb]", () => {
		it("concatenates the arrays", () => {
			fc.assert(
				fc.property(
					fc.float64Array({ noNaN: true }),
					fc.float64Array({ noNaN: true }),
					(lhs, rhs) => {
						const result = cmb(lhs, rhs);

						const expected = new Float64Array(
							lhs.length + rhs.length,
						);
						expected.set(lhs);
						expected.set(rhs, lhs.length);

						expect(result).to.deep.equal(expected);
					},
				),
			);
		});

		it("implements a lawful semigroup", () => {
			expectLawfulSemigroup(fc.float64Array({ noNaN: true }));
		});
	});
});
