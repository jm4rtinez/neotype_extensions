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

import { cmb, type Semigroup } from "@neotype/prelude/cmb.js";
import { eq, type Eq } from "@neotype/prelude/cmp.js";
import { id } from "@neotype/prelude/fn.js";
import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import "./function.js";
import "./string.js";

describe("Function", () => {
	describe("#[Semigroup.cmb]", () => {
		it("combines the function results", () => {
			fc.assert(
				fc.property(fc.string(), (val) => {
					const f = cmb(id<string>, id);
					const result = f(val);
					expect(result).to.equal(cmb(val, val));
				}),
			);
		});

		it("implements a lawful semigroup", () => {
			function expectLawfulFunctionSemigroup<
				A extends Semigroup<A> & Eq<A>,
			>(arb: fc.Arbitrary<A>): void {
				type Id<in out A> = (val: A) => A;
				fc.assert(
					fc.property(arb, (val) => {
						expect(
							eq(
								cmb<Id<A>>(id, cmb(id, id))(val),
								cmb<Id<A>>(cmb(id, id), id)(val),
							),
						).to.be.true;
					}),
				);
			}

			expectLawfulFunctionSemigroup(fc.string());
		});
	});
});
