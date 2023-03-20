import { cmb } from "@neotype/prelude/cmb.js";
import { eq } from "@neotype/prelude/cmp.js";
import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import "./map.js";
import "./string.js";
import { expectLawfulEq, expectLawfulSemigroup } from "./_test/utils.js";

describe("Map", () => {
    describe("#[Eq.eq]", () => {
        it("compares the keys strictly and compares the values using their Eq implementation", () => {
            fc.assert(
                fc.property(
                    fc
                        .uniqueArray(fc.tuple(fc.anything(), fc.string()))
                        .map((entries) => new Map(entries)),
                    fc
                        .uniqueArray(fc.tuple(fc.anything(), fc.string()))
                        .map((entries) => new Map(entries)),
                    (xs, ys) => {
                        const result = eq(xs, ys);

                        const exp = (() => {
                            if (xs.size !== ys.size) {
                                return false;
                            }
                            for (const [kx, x] of xs.entries()) {
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                if (!(ys.has(kx) && eq(ys.get(kx)!, x))) {
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
                fc
                    .uniqueArray(fc.tuple(fc.anything(), fc.string()))
                    .map((entries) => new Map(entries)),
            );
        });
    });

    describe("#[Semigroup.cmb]", () => {
        it("takes the union of the maps", () => {
            fc.assert(
                fc.property(
                    fc
                        .uniqueArray(fc.tuple(fc.anything(), fc.anything()))
                        .map((entries) => new Map(entries)),
                    fc
                        .uniqueArray(fc.tuple(fc.anything(), fc.anything()))
                        .map((entries) => new Map(entries)),
                    (xs, ys) => {
                        const result = cmb(xs, ys);
                        const exp = new Map([...xs, ...ys]);

                        expect(result.size).to.equal(exp.size);
                        for (const [kx, x] of result) {
                            expect(exp.has(kx)).to.be.true;
                            expect(exp.get(kx)).to.deep.equal(x);
                        }
                    },
                ),
            );
        });

        it("implements a lawful semigroup", () => {
            expectLawfulSemigroup(
                fc
                    .uniqueArray(fc.tuple(fc.anything(), fc.string()))
                    .map((entries) => new Map(entries)),
            );
        });
    });
});

describe("ReadonlyMap", () => {
    describe("#[Eq.eq]", () => {
        it("compares the readonly map and non-readonly map to each other", () => {
            const xs: ReadonlyMap<unknown, string> = new Map();
            const ys: Map<unknown, string> = new Map();
            eq(xs, xs);
            eq(xs, ys);
            eq(ys, xs);
        });
    });

    describe("#[Semigroup.cmb]", () => {
        it("combines the readonly map and non-readonly map with each other", () => {
            const xs: ReadonlyMap<unknown, unknown> = new Map();
            const ys: Map<unknown, unknown> = new Map();
            cmb(xs, xs);
            cmb(xs, ys);
            cmb(ys, xs);
        });
    });
});
