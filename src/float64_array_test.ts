import { cmb } from "@neotype/prelude/cmb.js";
import { cmp, eq, icmpBy, ieqBy, Ordering } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "./float64_array.js";
import {
    expectLawfulEq,
    expectLawfulOrd,
    expectLawfulSemigroup,
} from "./_test/utils.js";

describe("float64_array.js", () => {
    describe("Float64Array", () => {
        describe("#[Eq.eq]", () => {
            it("compares the arrays lexicographically", () => {
                fc.assert(
                    fc.property(
                        fc.float64Array({ noNaN: true }),
                        fc.float64Array({ noNaN: true }),
                        (xs, ys) => {
                            expect(eq(xs, ys)).to.equal(
                                ieqBy(xs, ys, (x, y) => x === y),
                            );
                        },
                    ),
                );
            });

            it("implements a lawful equivalence relation", () => {
                expectLawfulEq(fc.float64Array({ noNaN: true }));
            });
        });

        describe("#[Ord.cmp]", () => {
            it("compares the arrays lexicographically", () => {
                fc.assert(
                    fc.property(
                        fc.float64Array({ noNaN: true }),
                        fc.float64Array({ noNaN: true }),
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

            it("implements a lawful total order", () => {
                expectLawfulOrd(fc.float64Array({ noNaN: true }));
            });
        });

        describe("#[Semigroup.cmb]", () => {
            it("concatenates the arrays", () => {
                fc.assert(
                    fc.property(
                        fc.float64Array({ noNaN: true }),
                        fc.float64Array({ noNaN: true }),
                        (xs, ys) => {
                            const result = cmb(xs, ys);

                            const exp = new Float64Array(xs.length + ys.length);
                            exp.set(xs);
                            exp.set(ys, xs.length);

                            expect(result).to.deep.equal(exp);
                            expect(exp.length).to.equal(xs.length + ys.length);
                        },
                    ),
                );
            });

            it("implements a lawful semigroup", () => {
                expectLawfulSemigroup(fc.float64Array({ noNaN: true }));
            });
        });
    });
});
