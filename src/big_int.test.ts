import { cmp, eq, Ordering } from "@neotype/prelude/cmp.js";
import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import "./big_int.js";
import { expectLawfulEq, expectLawfulOrd } from "./_test/utils.js";

describe("big_int.js", () => {
    describe("BigInt", () => {
        describe("#[Eq.eq]", () => {
            it("compares the bigints strictly", () => {
                fc.assert(
                    fc.property(fc.bigInt(), fc.bigInt(), (x, y) => {
                        expect(eq(x, y)).to.equal(x === y);
                    }),
                );
            });

            it("implements a lawful equivalence relation", () => {
                expectLawfulEq(fc.bigInt());
            });
        });

        describe("#[Ord.cmp]", () => {
            it("compares the bigints as ordered from least to greatest", () => {
                fc.assert(
                    fc.property(fc.bigInt(), fc.bigInt(), (x, y) => {
                        expect(cmp(x, y)).to.equal(Ordering.fromNumber(x - y));
                    }),
                );
            });

            it("implements a lawful total order", () => {
                expectLawfulOrd(fc.bigInt());
            });
        });
    });
});
