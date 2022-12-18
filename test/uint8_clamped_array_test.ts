import { cmb } from "@neotype/prelude/cmb.js";
import { cmp, eq, icmpBy, ieqBy, Ordering } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "../src/uint8_clamped_array.js";

describe("uint8_clamped_array.js", () => {
    describe("Uint8ClampedArray", () => {
        specify("#[Eq.eq]", () => {
            fc.assert(
                fc.property(
                    fc.uint8ClampedArray(),
                    fc.uint8ClampedArray(),
                    (xs, ys) => {
                        expect(eq(xs, ys)).to.equal(
                            ieqBy(xs, ys, (x, y) => x === y),
                        );
                    },
                ),
            );
        });

        specify("#[Ord.cmp]", () => {
            fc.assert(
                fc.property(
                    fc.uint8ClampedArray(),
                    fc.uint8ClampedArray(),
                    (xs, ys) => {
                        expect(cmp(xs, ys)).to.equal(
                            icmpBy(xs, ys, (x, y) =>
                                Ordering.fromNumber(x - y),
                            ),
                        );
                    },
                ),
            );
        });

        specify("#[Semigroup.cmb]", () => {
            fc.assert(
                fc.property(
                    fc.uint8ClampedArray(),
                    fc.uint8ClampedArray(),
                    (xs, ys) => {
                        const result = cmb(xs, ys);

                        const exp = new Uint8ClampedArray(
                            xs.length + ys.length,
                        );
                        exp.set(xs);
                        exp.set(ys, xs.length);

                        expect(result).to.deep.equal(exp);
                        expect(exp.length).to.equal(xs.length + ys.length);
                    },
                ),
            );
        });
    });
});
