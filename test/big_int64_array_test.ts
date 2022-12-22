import { cmb } from "@neotype/prelude/cmb.js";
import { cmp, eq, icmpBy, ieqBy, Ordering } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "../src/big_int64_array.js";

describe("big_int64_array.js", () => {
    describe("BigInt64Array", () => {
        specify("#[Eq.eq]", () => {
            fc.assert(
                fc.property(
                    fc.bigInt64Array(),
                    fc.bigInt64Array(),
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
                    fc.bigInt64Array(),
                    fc.bigInt64Array(),
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
                    fc.bigInt64Array(),
                    fc.bigInt64Array(),
                    (xs, ys) => {
                        const result = cmb(xs, ys);

                        const exp = new BigInt64Array(xs.length + ys.length);
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
