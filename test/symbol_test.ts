import { eq } from "@neotype/prelude/cmp.js";
import { assert } from "chai";
import "../src/symbol.js";

describe("symbol", () => {
    specify("[Eq.eq]", () => {
        const s0 = Symbol() as symbol;
        const s1 = Symbol() as symbol;
        assert.strictEqual(eq(s0, s0), true);
        assert.strictEqual(eq(s0, s1), false);
        assert.strictEqual(eq(s1, s0), false);
        assert.strictEqual(eq(s1, s1), true);
    });
});
