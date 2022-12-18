import { cmb } from "@neotype/prelude/cmb.js";
import { eq } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "../src/set.js";

describe("set.js", () => {
    describe("Set", () => {
        specify("#[Eq.eq]", () => {
            fc.assert(
                fc.property(
                    fc.array(fc.anything()).map((xs) => new Set(xs)),
                    fc.array(fc.anything()).map((xs) => new Set(xs)),
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

        specify("#[Semigroup.cmb]", () => {
            fc.assert(
                fc.property(
                    fc.array(fc.anything()).map((xs) => new Set(xs)),
                    fc.array(fc.anything()).map((xs) => new Set(xs)),
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
    });

    describe("ReadonlySet", () => {
        specify("#[Eq.eq]", () => {
            const xs: ReadonlySet<unknown> = new Set();
            const ys: Set<unknown> = new Set();
            eq(xs, xs);
            eq(xs, ys);
            eq(ys, xs);
        });

        specify("#[Semigroup.cmb]", () => {
            const xs: ReadonlySet<unknown> = new Set();
            const ys: Set<unknown> = new Set();
            cmb(xs, xs);
            cmb(xs, ys);
            cmb(ys, xs);
        });
    });
});
