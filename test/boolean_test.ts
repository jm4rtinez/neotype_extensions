import { cmp, eq, Ordering } from "@neotype/prelude/cmp.js";
import { assert } from "chai";
import * as fc from "fast-check";
import "../src/boolean.js";

describe("boolean", () => {
    specify("[Eq.eq]", () => {
        fc.assert(
            fc.property(fc.boolean(), fc.boolean(), (x, y) => {
                const t0 = eq(x, y);
                assert.strictEqual(t0, x === y);
            }),
        );
    });

    specify("[Ord.cmp]", () => {
        fc.assert(
            fc.property(fc.boolean(), fc.boolean(), (x, y) => {
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
