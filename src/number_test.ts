import { cmp, eq, Ordering } from "@neotype/prelude/cmp.js";
import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import "./number.js";
import { expectLawfulEq, expectLawfulOrd } from "./_test/utils.js";

describe("Number", () => {
    describe("#[Eq.eq]", () => {
        it("compares the numbers strictly", () => {
            fc.assert(
                fc.property(
                    fc.float({ noNaN: true }),
                    fc.float({ noNaN: true }),
                    (x, y) => {
                        expect(eq(x, y)).to.equal(x === y);
                    },
                ),
            );
        });

        it("implements a lawful equivalence relation", () => {
            expectLawfulEq(fc.float({ noNaN: true }));
        });
    });

    describe("#[Ord.cmp]", () => {
        it("compares the numbers as ordered from least to greatest", () => {
            fc.assert(
                fc.property(
                    fc.float({ noNaN: true }),
                    fc.float({ noNaN: true }),
                    (x, y) => {
                        expect(cmp(x, y)).to.equal(Ordering.fromNumber(x - y));
                    },
                ),
            );
        });

        it("implements a lawful total order", () => {
            expectLawfulOrd(fc.float({ noNaN: true }));
        });
    });
});
