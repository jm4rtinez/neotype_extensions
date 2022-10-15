import { cmb } from "@neotype/prelude/cmb.js";
import { eq } from "@neotype/prelude/cmp.js";
import { assert } from "chai";
import "../src/set.js";

describe("Set", () => {
    specify("[Eq.eq]", () => {
        const t0 = eq(new Set([1, 2]), new Set([1, 2]));
        assert.strictEqual(t0, true);

        const t1 = eq(new Set([1, 2]), new Set([2, 1]));
        assert.strictEqual(t1, true);

        const t2 = eq(new Set([1, 2]), new Set([1, 2, 3]));
        assert.strictEqual(t2, false);

        const t3 = eq(new Set([1, 2]), new Set([1, 3]));
        assert.strictEqual(t3, false);

        const t4 = eq(new Set([1, 2]) as ReadonlySet<number>, new Set([1, 2]));
        assert.strictEqual(t4, true);

        const t5 = eq(new Set([1, 2]), new Set([1, 2]) as ReadonlySet<number>);
        assert.strictEqual(t5, true);
    });

    specify("[Semigroup.cmb]", () => {
        const t0 = cmb(new Set([1, 2]), new Set([1, 2]));
        assert.deepEqual(t0, new Set([1, 2]));

        const t1 = cmb(new Set([1, 2]), new Set([1, 2, 3]));
        assert.deepEqual(t1, new Set([1, 2, 3]));

        const t2 = cmb(new Set([1, 2]) as ReadonlySet<number>, new Set([1, 2]));
        assert.deepEqual(t2, new Set([1, 2]));

        const t3 = cmb(new Set([1, 2]), new Set([1, 2]) as ReadonlySet<number>);
        assert.deepEqual(t3, new Set([1, 2]));
    });
});
