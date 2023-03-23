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
import "./int8_array.js";

describe("Int8Array", () => {
	describe("#[Eq.eq]", () => {
		it("compares the arrays lexicographically", () => {
			fc.assert(
				fc.property(fc.int8Array(), fc.int8Array(), (xs, ys) => {
					expect(eq(xs, ys)).to.equal(
						ieqBy(xs, ys, (x, y) => x === y),
					);
				}),
			);
		});

		it("implements a lawful equivalence relation", () => {
			expectLawfulEq(fc.int8Array());
		});
	});

	describe("#[Ord.cmp]", () => {
		it("compares the arrays lexicographically", () => {
			fc.assert(
				fc.property(fc.int8Array(), fc.int8Array(), (xs, ys) => {
					expect(cmp(xs, ys)).to.equal(
						icmpBy(xs, ys, (x, y) => Ordering.fromNumber(x - y)),
					);
				}),
			);
		});

		it("implements a lawful total order", () => {
			expectLawfulOrd(fc.int8Array());
		});
	});

	describe("#[Semigroup.cmb]", () => {
		it("concatenates the arrays", () => {
			fc.assert(
				fc.property(fc.int8Array(), fc.int8Array(), (xs, ys) => {
					const result = cmb(xs, ys);

					const exp = new Int8Array(xs.length + ys.length);
					exp.set(xs);
					exp.set(ys, xs.length);

					expect(result).to.deep.equal(exp);
					expect(exp.length).to.equal(xs.length + ys.length);
				}),
			);
		});

		it("implements a lawful semigroup", () => {
			expectLawfulSemigroup(fc.int8Array());
		});
	});
});
