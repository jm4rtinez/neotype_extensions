import { cmb } from "@neotype/prelude/cmb.js";
import { cmp, eq, icmp, ieq } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "../src/array.js";
import "../src/number.js";
import "../src/string.js";

describe("array.js", () => {
    describe("Array", () => {
        specify("#[Eq.eq]", () => {
            fc.assert(
                fc.property(
                    fc.array(fc.float({ noNaN: true })),
                    fc.array(fc.float({ noNaN: true })),
                    (xs, ys) => {
                        expect(eq(xs, ys)).to.equal(ieq(xs, ys));
                    },
                ),
            );
        });

        specify("#[Ord.cmp]", () => {
            fc.assert(
                fc.property(
                    fc.array(fc.float({ noNaN: true })),
                    fc.array(fc.float({ noNaN: true })),
                    (xs, ys) => {
                        expect(cmp(xs, ys)).to.equal(icmp(xs, ys));
                    },
                ),
            );
        });

        specify("#[Semigroup.cmb]", () => {
            fc.assert(
                fc.property(
                    fc.array(fc.anything()),
                    fc.array(fc.anything()),
                    (xs, ys) => {
                        expect(cmb(xs, ys)).to.equal([...xs, ...ys]);
                    },
                ),
            );
        });
    });

    describe("ReadonlyArray", () => {
        specify("#[Eq.eq]", () => {
            const xs: readonly number[] = [];
            const ys: number[] = [];
            eq(xs, xs);
            eq(xs, ys);
            eq(ys, xs);
        });

        specify("#[Ord.cmp]", () => {
            const xs: readonly number[] = [];
            const ys: number[] = [];
            cmp(xs, xs);
            cmp(xs, ys);
            cmp(ys, xs);
        });

        specify("#[Semigroup.cmb]", () => {
            const xs: readonly unknown[] = [];
            const ys: unknown[] = [];
            cmb(xs, xs);
            cmb(xs, ys);
            cmb(ys, xs);
        });
    });

    describe("tuple literal", () => {
        specify("#[Eq.eq]", () => {
            fc.assert(
                fc.property(
                    fc.float({ noNaN: true }),
                    fc.string(),
                    fc.float({ noNaN: true }),
                    fc.string(),
                    (a, x, b, y) => {
                        const xs: [number, string] = [a, x];
                        const ys: [number, string] = [b, y];
                        expect(eq(xs, ys)).to.equal(eq(a, b) && eq(x, y));
                    },
                ),
            );
        });

        specify("#[Ord.cmp]", () => {
            fc.assert(
                fc.property(
                    fc.float({ noNaN: true }),
                    fc.string(),
                    fc.float({ noNaN: true }),
                    fc.string(),
                    (a, x, b, y) => {
                        const xs: [number, string] = [a, x];
                        const ys: [number, string] = [b, y];
                        expect(cmp(xs, ys)).to.equal(cmb(cmp(a, b), cmp(x, y)));
                    },
                ),
            );
        });
    });

    describe("readonly tuple literal", () => {
        specify("#[Eq.eq]", () => {
            const xs: readonly [number, string] = [0, ""];
            const ys: [number, string] = [0, ""];
            eq(xs, xs);
            eq(xs, ys);
            eq(ys, xs);
        });

        specify("#[Ord.cmp]", () => {
            const xs: readonly [number, string] = [0, ""];
            const ys: [number, string] = [0, ""];
            cmp(xs, xs);
            cmp(xs, ys);
            cmp(ys, xs);
        });
    });
});
