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
