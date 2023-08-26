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
import { eq, type Eq } from "@neotype/prelude/cmp.js";
import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import "./promise.js";
import "./string.js";

describe("Promise", () => {
	describe("#[Semigroup.cmb]", () => {
		it("combines the fulfilled results", async () => {
			const property = fc.asyncProperty(
				fc.string(),
				fc.string(),
				async (lhs, rhs) => {
					const result = await cmb(
						Promise.resolve(lhs),
						Promise.resolve(rhs),
					);
					expect(result).to.equal(cmb(lhs, rhs));
				},
			);
			await fc.assert(property);
		});

		it("implements a lawful semigroup", async () => {
			async function expectLawfulPromiseSemigroup<
				A extends Semigroup<A> & Eq<A>,
			>(arb: fc.Arbitrary<Promise<A>>): Promise<void> {
				const property = fc.asyncProperty(
					arb,
					arb,
					arb,
					async (first, second, third) => {
						const t0 = await cmb(first, cmb(second, third));
						const t1 = await cmb(cmb(first, second), third);
						expect(eq(t0, t1)).to.be.true;
					},
				);
				await fc.assert(property);
			}

			await expectLawfulPromiseSemigroup(
				fc.string().map((val) => Promise.resolve(val)),
			);
		});
	});
});
