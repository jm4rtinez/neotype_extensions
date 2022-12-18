import { cmb } from "@neotype/prelude/cmb.js";
import { cmp, eq, Ordering } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "../src/string.js";

describe("string.js", () => {
    describe("String", () => {
        specify("#[Eq.eq]", () => {
            fc.assert(
                fc.property(fc.string(), fc.string(), (x, y) => {
                    expect(eq(x, y)).to.equal(x === y);
                }),
            );
        });

        specify("#[Ord.cmp]", () => {
            fc.assert(
                fc.property(fc.string(), fc.string(), (x, y) => {
                    expect(cmp(x, y)).to.equal(
                        x < y
                            ? Ordering.less
                            : x > y
                            ? Ordering.greater
                            : Ordering.equal,
                    );
                }),
            );
        });

        specify("#[Semigroup.cmb]", () => {
            fc.assert(
                fc.property(fc.string(), fc.string(), (x, y) => {
                    expect(cmb(x, y)).to.equal(x + y);
                }),
            );
        });
    });
});
