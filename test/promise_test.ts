import { cmb } from "@neotype/prelude/cmb.js";
import { assert } from "chai";
import * as fc from "fast-check";
import "../src/promise.js";
import "../src/string.js";

describe("Promise", () => {
    specify("[Semigroup.cmb]", () => {
        fc.assert(
            fc.asyncProperty(fc.string(), fc.string(), async (x, y) => {
                const t0 = await cmb(Promise.resolve(x), Promise.resolve(y));
                assert.strictEqual(t0, cmb(x, y));
            }),
        );
    });
});
