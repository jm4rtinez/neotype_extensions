import { cmb } from "@neotype/prelude/cmb.js";
import { eq } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "../src/map.js";
import "../src/string.js";

describe("map.js", () => {
    describe("Map", () => {
        specify("#[Eq.eq]", () => {
            fc.assert(
                fc.property(
                    fc
                        .array(fc.tuple(fc.anything(), fc.string()))
                        .map((entries) => new Map(entries)),
                    fc
                        .array(fc.tuple(fc.anything(), fc.string()))
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

        specify("#[Semigroup.cmb]", () => {
            fc.assert(
                fc.property(
                    fc
                        .array(fc.tuple(fc.anything(), fc.anything()))
                        .map((entries) => new Map(entries)),
                    fc
                        .array(fc.tuple(fc.anything(), fc.anything()))
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
    });

    describe("ReadonlyMap", () => {
        specify("#[Eq.eq]", () => {
            const xs: ReadonlyMap<unknown, string> = new Map();
            const ys: Map<unknown, string> = new Map();
            eq(xs, xs);
            eq(xs, ys);
            eq(ys, xs);
        });

        specify("#[Semigroup.cmb]", () => {
            const xs: ReadonlyMap<unknown, unknown> = new Map();
            const ys: Map<unknown, unknown> = new Map();
            cmb(xs, xs);
            cmb(xs, ys);
            cmb(ys, xs);
        });
    });
});
