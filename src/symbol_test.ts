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

import { eq } from "@neotype/prelude/cmp.js";
import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import "./symbol.js";
import { expectLawfulEq } from "./_test/utils.js";

describe("Symbol", () => {
    describe("#[Eq.eq]", () => {
        it("compares a symbol as equal to itself", () => {
            const sym = Symbol();
            expect(eq(sym, sym)).to.be.true;
        });

        it("compares two different symbols as inequal", () => {
            expect(eq(Symbol(), Symbol())).to.be.false;
        });

        it("implements a lawful equivalence relation", () => {
            function arbSymbol(): fc.Arbitrary<symbol> {
                return fc.oneof(
                    fc.constant(Symbol()),
                    fc.constant(Symbol()),
                    fc.constant(Symbol()),
                );
            }

            expectLawfulEq(arbSymbol());
        });
    });
});
