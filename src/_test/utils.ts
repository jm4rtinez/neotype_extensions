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

import { cmb, type Semigroup } from "@neotype/prelude/cmb.js";
import { eq, le, type Eq, type Ord } from "@neotype/prelude/cmp.js";
import * as fc from "fast-check";
import { expect } from "vitest";

export function expectLawfulEq<A extends Eq<A>>(arb: fc.Arbitrary<A>): void {
	const reflexivity = fc.property(arb, (val) => {
		expect(eq(val, val), "reflexivity").to.be.true;
	});

	const symmetry = fc.property(arb, arb, (lhs, rhs) => {
		expect(eq(lhs, rhs), "symmetry").to.equal(eq(rhs, lhs));
	});

	const transitivity = fc.property(arb, arb, arb, (first, second, third) => {
		if (eq(first, second) && eq(second, third)) {
			expect(eq(first, third), "transitivity").to.be.true;
		}
	});

	fc.assert(reflexivity);
	fc.assert(symmetry);
	fc.assert(transitivity);
}

export function expectLawfulOrd<A extends Ord<A>>(arb: fc.Arbitrary<A>): void {
	const reflexivity = fc.property(arb, (val) => {
		expect(le(val, val), "reflexivity").to.be.true;
	});

	const antisymmetry = fc.property(arb, arb, (lhs, rhs) => {
		expect(le(lhs, rhs) && le(rhs, lhs), "antisymmetry").to.equal(
			eq(lhs, rhs),
		);
	});

	const transitivity = fc.property(arb, arb, arb, (first, second, third) => {
		if (le(first, second) && le(second, third)) {
			expect(le(first, third), "transitivity").to.be.true;
		}
	});

	const comparability = fc.property(arb, arb, (lhs, rhs) => {
		expect(le(lhs, rhs) || le(rhs, lhs), "comparability").to.be.true;
	});

	fc.assert(reflexivity);
	fc.assert(antisymmetry);
	fc.assert(transitivity);
	fc.assert(comparability);
}

export function expectLawfulSemigroup<A extends Semigroup<A> & Eq<A>>(
	arb: fc.Arbitrary<A>,
): void {
	const associativity = fc.property(arb, arb, arb, (first, second, third) => {
		expect(
			eq(cmb(first, cmb(second, third)), cmb(cmb(first, second), third)),
			"associativity",
		).to.be.true;
	});
	fc.assert(associativity);
}
