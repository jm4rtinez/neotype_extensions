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
import { cmp, eq, icmp, ieq } from "@neotype/prelude/cmp.js";
import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import {
	expectLawfulEq,
	expectLawfulOrd,
	expectLawfulSemigroup,
} from "./_test/utils.js";
import "./array.js";
import "./number.js";
import "./string.js";

describe("Array", () => {
	describe("#[Eq.eq]", () => {
		it("compares the arrays lexicographically", () => {
			const property = fc.property(
				fc.array(fc.float({ noNaN: true })),
				fc.array(fc.float({ noNaN: true })),
				(lhs, rhs) => {
					expect(eq(lhs, rhs)).to.equal(ieq(lhs, rhs));
				},
			);
			fc.assert(property);
		});

		it("implements a lawful equivalence relation", () => {
			expectLawfulEq(fc.array(fc.float({ noNaN: true })));
		});
	});

	describe("#[Ord.cmp]", () => {
		it("compares the arrays lexicographically", () => {
			const property = fc.property(
				fc.array(fc.float({ noNaN: true })),
				fc.array(fc.float({ noNaN: true })),
				(lhs, rhs) => {
					expect(cmp(lhs, rhs)).to.equal(icmp(lhs, rhs));
				},
			);
			fc.assert(property);
		});

		it("implements a lawful total order", () => {
			expectLawfulOrd(fc.array(fc.float({ noNaN: true })));
		});
	});

	describe("#[Semigroup.cmb]", () => {
		it("concatenates the arrays", () => {
			const property = fc.property(
				fc.array(fc.anything()),
				fc.array(fc.anything()),
				(lhs, rhs) => {
					expect(cmb(lhs, rhs)).to.deep.equal([...lhs, ...rhs]);
				},
			);
			fc.assert(property);
		});

		it("implements a lawful semigroup", () => {
			expectLawfulSemigroup(fc.array(fc.string()));
		});
	});
});

describe("ReadonlyArray", () => {
	describe("#[Eq.eq]", () => {
		it("compares the readonly array and non-readonly array to each other", () => {
			const readonly: readonly number[] = [];
			const writable: number[] = [];
			eq(readonly, readonly);
			eq(readonly, writable);
			eq(writable, readonly);
		});
	});

	describe("#[Ord.cmp]", () => {
		it("compares the readonly array and non-readonly array to each other", () => {
			const readonly: readonly number[] = [];
			const writable: number[] = [];
			cmp(readonly, readonly);
			cmp(readonly, writable);
			cmp(writable, readonly);
		});
	});

	describe("#[Semigroup.cmb]", () => {
		it("combines the readonly array and non-readonly array with each other", () => {
			const readonly: readonly number[] = [];
			const writable: number[] = [];
			cmb(readonly, readonly);
			cmb(readonly, writable);
			cmb(writable, readonly);
		});
	});
});

describe("tuple literal", () => {
	describe("#[Eq.eq]", () => {
		it("compares the tuple literals lexicographically", () => {
			const property = fc.property(
				fc.float({ noNaN: true }),
				fc.string(),
				fc.float({ noNaN: true }),
				fc.string(),
				(lhs0, lhs1, rhs0, rhs1) => {
					const lhs: [number, string] = [lhs0, lhs1];
					const rhs: [number, string] = [rhs0, rhs1];
					expect(eq(lhs, rhs)).to.equal(
						eq(lhs0, rhs0) && eq(lhs1, rhs1),
					);
				},
			);
			fc.assert(property);
		});

		it("implements a lawful equivalence relation", () => {
			expectLawfulEq(fc.tuple(fc.float({ noNaN: true }), fc.string()));
		});
	});

	describe("#[Ord.cmp]", () => {
		it("compares the tuple literals lexicographically", () => {
			const property = fc.property(
				fc.float({ noNaN: true }),
				fc.string(),
				fc.float({ noNaN: true }),
				fc.string(),
				(lhs0, lhs1, rhs0, rhs1) => {
					const lhs: [number, string] = [lhs0, lhs1];
					const rhs: [number, string] = [rhs0, rhs1];
					expect(cmp(lhs, rhs)).to.equal(
						cmb(cmp(lhs0, rhs0), cmp(lhs1, rhs1)),
					);
				},
			);
			fc.assert(property);
		});

		it("implements a lawful total order", () => {
			expectLawfulOrd(fc.tuple(fc.float({ noNaN: true }), fc.string()));
		});
	});
});

describe("readonly tuple literal", () => {
	describe("#[Eq.eq]", () => {
		it("compares the readonly tuple literal and non-readonly tuple literal to each other", () => {
			const readonly: readonly [number, string] = [0, ""];
			const writable: [number, string] = [0, ""];
			eq(readonly, readonly);
			eq(readonly, writable);
			eq(writable, readonly);
		});
	});

	describe("#[Ord.cmp]", () => {
		it("compares the readonly tuple literal and non-readonly tuple literal to each other", () => {
			const readonly: readonly [number, string] = [0, ""];
			const writable: [number, string] = [0, ""];
			cmp(readonly, readonly);
			cmp(readonly, writable);
			cmp(writable, readonly);
		});
	});
});
