import { cmp, eq, Ordering } from "@neotype/prelude/cmp.js";
import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import "./boolean.js";
import { expectLawfulEq, expectLawfulOrd } from "./_test/utils.js";

describe("Boolean", () => {
    describe("#[Eq.eq]", () => {
        it("compares the booleans strictly", () => {
            fc.assert(
                fc.property(fc.boolean(), fc.boolean(), (x, y) => {
                    expect(eq(x, y)).to.equal(x === y);
                }),
            );
        });

        it("implements a lawful equivalence relation", () => {
            expectLawfulEq(fc.boolean());
        });
    });

    describe("#[Ord.cmp]", () => {
        it("compares false as less than true", () => {
            fc.assert(
                fc.property(fc.boolean(), fc.boolean(), (x, y) => {
                    expect(cmp(x, y)).to.equal(
                        Ordering.fromNumber(Number(x) - Number(y)),
                    );
                }),
            );
        });

        it("implements a lawful total order", () => {
            expectLawfulOrd(fc.boolean());
        });
    });
});
