import { cmb } from "@neotype/prelude/cmb.js";
import { cmp, eq, icmp, ieq } from "@neotype/prelude/cmp.js";
import { assert } from "chai";
import * as fc from "fast-check";
import "../src/array.js";
import "../src/number.js";
import "../src/string.js";

describe("Array", () => {
    specify("[Eq.eq]", () => {
        fc.assert(
            fc.property(
                fc.array(fc.float({ noNaN: true })),
                fc.array(fc.float({ noNaN: true })),
                (xs, ys) => {
                    const t0 = eq(xs, ys);
                    assert.strictEqual(t0, ieq(xs, ys));

                    const t1 = eq(xs as readonly number[], ys);
                    assert.strictEqual(t1, ieq(xs, ys));

                    const t2 = eq(xs, ys as readonly number[]);
                    assert.strictEqual(t2, ieq(xs, ys));
                },
            ),
        );
    });

    specify("[Ord.cmp]", () => {
        fc.assert(
            fc.property(
                fc.array(fc.float({ noNaN: true })),
                fc.array(fc.float({ noNaN: true })),
                (xs, ys) => {
                    const t0 = cmp(xs, ys);
                    assert.strictEqual(t0, icmp(xs, ys));

                    const t1 = cmp(xs as readonly number[], ys);
                    assert.strictEqual(t1, icmp(xs, ys));

                    const t2 = cmp(xs, ys as readonly number[]);
                    assert.strictEqual(t2, icmp(xs, ys));
                },
            ),
        );
    });

    specify("[Semigroup.cmb]", () => {
        fc.assert(
            fc.property(
                fc.array(fc.float({ noNaN: true })),
                fc.array(fc.float({ noNaN: true })),
                (xs, ys) => {
                    const t0 = cmb(xs, ys);
                    assert.deepEqual(t0, [...xs, ...ys]);
                },
            ),
        );
    });
});

describe("tuple literal", () => {
    specify("[Eq.eq]", () => {
        fc.assert(
            fc.property(
                fc.float({ noNaN: true }),
                fc.string(),
                fc.float({ noNaN: true }),
                fc.string(),
                (a, x, b, y) => {
                    const xs: [number, string] = [a, x];
                    const ys: [number, string] = [b, y];
                    const rxs = [a, x] as const;
                    const rys = [b, y] as const;

                    const t0 = eq(xs, ys);
                    assert.strictEqual(t0, eq(a, b) && eq(x, y));

                    const t1 = eq(xs, rys);
                    assert.strictEqual(t1, eq(a, b) && eq(x, y));

                    const t2 = eq(rxs, ys);
                    assert.strictEqual(t2, eq(a, b) && eq(x, y));

                    const t3 = eq(rxs, ys);
                    assert.strictEqual(t3, eq(a, b) && eq(x, y));
                },
            ),
        );
    });

    specify("[Ord.cmp]", () => {
        fc.assert(
            fc.property(
                fc.float({ noNaN: true }),
                fc.string(),
                fc.float({ noNaN: true }),
                fc.string(),
                (a, x, b, y) => {
                    const xs: [number, string] = [a, x];
                    const ys: [number, string] = [b, y];
                    const rxs = [a, x] as const;
                    const rys = [b, y] as const;

                    const t0 = cmp(xs, ys);
                    assert.strictEqual(t0, cmb(cmp(a, b), cmp(x, y)));

                    const t1 = cmp(xs, rys);
                    assert.strictEqual(t1, cmb(cmp(a, b), cmp(x, y)));

                    const t2 = cmp(rxs, ys);
                    assert.strictEqual(t2, cmb(cmp(a, b), cmp(x, y)));

                    const t3 = cmp(rxs, ys);
                    assert.strictEqual(t3, cmb(cmp(a, b), cmp(x, y)));
                },
            ),
        );
    });
});
