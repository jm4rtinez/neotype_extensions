import { cmp, eq, Ordering } from "@neotype/prelude/cmp.js";
import { assert } from "chai";
import * as fc from "fast-check";
import "../src/date.js";

describe("Date", () => {
    specify("[Eq.eq]", () => {
        fc.assert(
            fc.property(fc.date(), fc.date(), (x, y) => {
                const t0 = eq(x, y);
                assert.strictEqual(t0, x.getTime() === y.getTime());
            }),
        );
    });

    specify("[Ord.cmp]", () => {
        fc.assert(
            fc.property(fc.date(), fc.date(), (x, y) => {
                const t0 = cmp(x, y);
                assert.strictEqual(
                    t0,
                    x < y
                        ? Ordering.less
                        : x > y
                        ? Ordering.greater
                        : Ordering.equal,
                );
            }),
        );
    });
});
