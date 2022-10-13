import { cmb } from "@neotype/prelude/cmb.js";
import { cmp, eq, Ordering } from "@neotype/prelude/cmp.js";
import { assert } from "chai";
import * as fc from "fast-check";
import "../src/string.js";

describe("string", () => {
    specify("[Eq.eq]", () => {
        fc.assert(
            fc.property(fc.string(), fc.string(), (x, y) => {
                const t0 = eq(x, y);
                assert.strictEqual(t0, x === y);
            }),
        );
    });

    specify("[Ord.cmp]", () => {
        fc.assert(
            fc.property(fc.string(), fc.string(), (x, y) => {
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

    specify("[Semigroup.cmb]", () => {
        fc.assert(
            fc.property(fc.string(), fc.string(), (x, y) => {
                const t0 = cmb(x, y);
                assert.strictEqual(t0, x + y);
            }),
        );
    });
});
