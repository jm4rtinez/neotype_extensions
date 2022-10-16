import { cmb } from "@neotype/prelude/cmb.js";
import { id } from "@neotype/prelude/fn.js";
import { assert } from "chai";
import * as fc from "fast-check";
import "../src/function.js";
import "../src/string.js";

describe("Function", () => {
    specify("[Semigroup.cmb]", () => {
        fc.assert(
            fc.property(fc.string(), (x) => {
                const f0 = cmb(id<string>, id);
                const t0 = f0(x);
                assert.strictEqual(t0, cmb(x, x));
            }),
        );
    });
});
