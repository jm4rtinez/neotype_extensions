import { eq } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import "../src/symbol.js";

describe("symbol.js", () => {
    describe("Symbol", () => {
        describe("#[Eq.eq]", () => {
            it("compares a symbol as equal to itself", () => {
                const sym = Symbol();
                expect(eq(sym, sym)).to.be.true;
            });

            it("compares two different symbols as inequal", () => {
                expect(eq(Symbol(), Symbol())).to.be.false;
            });
        });
    });
});
