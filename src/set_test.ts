import { cmb } from "@neotype/prelude/cmb.js";
import { eq } from "@neotype/prelude/cmp.js";
import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import "./set.js";
import { expectLawfulEq, expectLawfulSemigroup } from "./_test/utils.js";

describe("Set", () => {
    describe("#[Eq.eq]", () => {
        it("compares the elements strictly", () => {
            fc.assert(
                fc.property(
                    fc.uniqueArray(fc.anything()).map((xs) => new Set(xs)),
                    fc.uniqueArray(fc.anything()).map((xs) => new Set(xs)),
                    (xs, ys) => {
                        const result = eq(xs, ys);

                        const exp = (() => {
                            if (xs.size !== ys.size) {
                                return false;
                            }
                            for (const x of xs) {
                                if (!ys.has(x)) {
                                    return false;
                                }
                            }
                            return true;
                        })();

                        expect(result).to.equal(exp);
                    },
                ),
            );
        });

        it("implements a lawful equivalence relation", () => {
            expectLawfulEq(
                fc.uniqueArray(fc.anything()).map((xs) => new Set(xs)),
            );
        });
    });

    describe("#[Semigroup.cmb]", () => {
        it("takes the union of the sets", () => {
            fc.assert(
                fc.property(
                    fc.uniqueArray(fc.anything()).map((xs) => new Set(xs)),
                    fc.uniqueArray(fc.anything()).map((xs) => new Set(xs)),
                    (xs, ys) => {
                        const result = cmb(xs, ys);
                        const exp = new Set([...xs, ...ys]);

                        expect(result.size).to.equal(exp.size);
                        for (const x of result) {
                            expect(exp.has(x)).to.be.true;
                        }
                    },
                ),
            );
        });

        it("implements a lawful semigroup", () => {
            expectLawfulSemigroup(
                fc.uniqueArray(fc.string()).map((xs) => new Set(xs)),
            );
        });
    });
});

describe("ReadonlySet", () => {
    describe("#[Eq.eq]", () => {
        it("compares the readonly set and non-readonly set to each other", () => {
            const xs: ReadonlySet<unknown> = new Set();
            const ys: Set<unknown> = new Set();
            eq(xs, xs);
            eq(xs, ys);
            eq(ys, xs);
        });
    });

    describe("#[Semigroup.cmb]", () => {
        it("combines the readonly set and non-readonly set with each other", () => {
            const xs: ReadonlySet<unknown> = new Set();
            const ys: Set<unknown> = new Set();
            cmb(xs, xs);
            cmb(xs, ys);
            cmb(ys, xs);
        });
    });
});
