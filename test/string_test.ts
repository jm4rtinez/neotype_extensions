import { cmb } from "@neotype/prelude/cmb.js";
import { cmp, eq, Ordering } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "../src/string.js";
import {
    expectLawfulEq,
    expectLawfulOrd,
    expectLawfulSemigroup,
} from "./util.js";

describe("string.js", () => {
    describe("String", () => {
        describe("#[Eq.eq]", () => {
            it("compares the string values strictly", () => {
                fc.assert(
                    fc.property(fc.string(), fc.string(), (x, y) => {
                        expect(eq(x, y)).to.equal(x === y);
                    }),
                );
            });

            it("implements a lawful equivalence relation", () => {
                expectLawfulEq(fc.string());
            });
        });

        describe("#[Ord.cmp]", () => {
            it("compares the string values lexicographically by their character code points", () => {
                fc.assert(
                    fc.property(fc.string(), fc.string(), (x, y) => {
                        expect(cmp(x, y)).to.equal(
                            x < y
                                ? Ordering.less
                                : x > y
                                ? Ordering.greater
                                : Ordering.equal,
                        );
                    }),
                );
            });

            it("implements a lawful total order", () => {
                expectLawfulOrd(fc.string());
            });
        });

        describe("#[Semigroup.cmb]", () => {
            it("combines the string values using concatenation", () => {
                fc.assert(
                    fc.property(fc.string(), fc.string(), (x, y) => {
                        expect(cmb(x, y)).to.equal(x + y);
                    }),
                );
            });

            it("implements a lawful semigroup", () => {
                expectLawfulSemigroup(fc.string());
            });
        });
    });
});
