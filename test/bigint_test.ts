import { cmp, eq, Ordering } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "../src/bigint.js";

describe("bigint.js", () => {
    describe("BigInt", () => {
        specify("[Eq.eq]", () => {
            fc.assert(
                fc.property(fc.bigInt(), fc.bigInt(), (x, y) => {
                    expect(eq(x, y)).to.equal(x === y);
                }),
            );
        });

        specify("[Ord.cmp]", () => {
            fc.assert(
                fc.property(fc.bigInt(), fc.bigInt(), (x, y) => {
                    expect(cmp(x, y)).to.equal(Ordering.fromNumber(x - y));
                }),
            );
        });
    });
});
