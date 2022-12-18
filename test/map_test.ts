import { cmb } from "@neotype/prelude/cmb.js";
import { eq } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "../src/map.js";

describe("map.js", () => {
    describe("Map", () => {
        specify("#[Eq.eq]", () => {
            fc.assert(
                fc.property(
                    fc
                        .array(fc.tuple(fc.anything(), fc.anything()))
                        .map((entries) => new Map(entries)),
                    fc
                        .array(fc.tuple(fc.anything(), fc.anything()))
                        .map((entries) => new Map(entries)),
                    (xs, ys) => {
                        const result = eq(xs, ys);

                        const exp = (() => {
                            if (xs.size !== ys.size) {
                                return false;
                            }
                            for (const [kx, x] of xs.entries()) {
                                if (!(ys.has(kx) && ys.get(kx) === x)) {
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
                            expect(exp.get(kx)).to.equal(x);
                        }
                    },
                ),
            );
        });
    });

    describe("ReadonlyMap", () => {
        specify("#[Eq.eq]", () => {
            const xs: ReadonlyMap<unknown, unknown> = new Map();
            const ys: Map<unknown, unknown> = new Map();
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
