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

import { cmb } from "@neotype/prelude/cmb.js";
import { Ordering, cmp, eq } from "@neotype/prelude/cmp.js";
import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import {
	expectLawfulEq,
	expectLawfulOrd,
	expectLawfulSemigroup,
} from "./_test/utils.js";
import "./string.js";

describe("String", () => {
	describe("#[Eq.eq]", () => {
		it("compares the strings strictly", () => {
			const property = fc.property(
				fc.string(),
				fc.string(),
				(lhs, rhs) => {
					expect(eq(lhs, rhs)).to.equal(lhs === rhs);
				},
			);
			fc.assert(property);
		});

		it("implements a lawful equivalence relation", () => {
			expectLawfulEq(fc.string());
		});
	});

	describe("#[Ord.cmp]", () => {
		it("compares the strings lexicographically by their character code points", () => {
			const property = fc.property(
				fc.string(),
				fc.string(),
				(lhs, rhs) => {
					expect(cmp(lhs, rhs)).to.equal(
						lhs < rhs
							? Ordering.less
							: lhs > rhs
							? Ordering.greater
							: Ordering.equal,
					);
				},
			);
			fc.assert(property);
		});

		it("implements a lawful total order", () => {
			expectLawfulOrd(fc.string());
		});
	});

	describe("#[Semigroup.cmb]", () => {
		it("concatenates the strings", () => {
			const property = fc.property(
				fc.string(),
				fc.string(),
				(lhs, rhs) => {
					expect(cmb(lhs, rhs)).to.equal(lhs + rhs);
				},
			);
			fc.assert(property);
		});

		it("implements a lawful semigroup", () => {
			expectLawfulSemigroup(fc.string());
		});
	});
});
