import { cmb } from "@neotype/prelude/cmb.js";
import { eq } from "@neotype/prelude/cmp.js";
import { assert } from "chai";
import "../src/map.js";

describe("Map", () => {
    specify("[Eq.eq]", () => {
        const t0 = eq(
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
        );
        assert.strictEqual(t0, true);

        const t1 = eq(
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
            new Map([
                ["b", 2],
                ["a", 1],
            ]),
        );
        assert.strictEqual(t1, true);

        const t2 = eq(
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
            new Map([
                ["b", 2],
                ["a", 1],
                ["c", 3],
            ]),
        );
        assert.strictEqual(t2, false);

        const t3 = eq(
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
            new Map([
                ["a", 1],
                ["b", 3],
            ]),
        );
        assert.strictEqual(t3, false);

        const t4 = eq(
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
            new Map([
                ["a", 1],
                ["c", 2],
            ]),
        );
        assert.strictEqual(t4, false);

        const t5 = eq(
            new Map([
                ["a", 1],
                ["b", 2],
            ]) as ReadonlyMap<string, number>,
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
        );
        assert.strictEqual(t5, true);

        const t6 = eq(
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
            new Map([
                ["b", 2],
                ["a", 1],
            ]) as ReadonlyMap<string, number>,
        );
        assert.strictEqual(t6, true);
    });

    specify("[Semigroup.cmb]", () => {
        const t0 = cmb(
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
        );
        assert.deepEqual(
            t0,
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
        );

        const t1 = cmb(
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
            new Map([
                ["a", 1],
                ["b", 3],
            ]),
        );
        assert.deepEqual(
            t1,
            new Map([
                ["a", 1],
                ["b", 3],
            ]),
        );

        const t2 = cmb(
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
            new Map([
                ["a", 1],
                ["b", 2],
                ["c", 3],
            ]),
        );
        assert.deepEqual(
            t2,
            new Map([
                ["a", 1],
                ["b", 2],
                ["c", 3],
            ]),
        );

        const t3 = cmb(
            new Map([
                ["a", 1],
                ["b", 2],
            ]) as ReadonlyMap<string, number>,
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
        );
        assert.deepEqual(
            t3,
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
        );

        const t4 = cmb(
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
            new Map([
                ["a", 1],
                ["b", 2],
            ]) as ReadonlyMap<string, number>,
        );
        assert.deepEqual(
            t4,
            new Map([
                ["a", 1],
                ["b", 2],
            ]),
        );
    });
});
