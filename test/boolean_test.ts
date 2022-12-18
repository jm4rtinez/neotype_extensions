import { cmp, eq, Ordering } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "../src/boolean.js";

describe("boolean.js", () => {
    describe("Boolean", () => {
        specify("#[Eq.eq]", () => {
            fc.assert(
                fc.property(fc.boolean(), fc.boolean(), (x, y) => {
                    expect(eq(x, y)).to.equal(x === y);
                }),
            );
        });

        specify("#[Ord.cmp]", () => {
            fc.assert(
                fc.property(fc.boolean(), fc.boolean(), (x, y) => {
                    expect(cmp(x, y)).to.equal(
                        Ordering.fromNumber(Number(x) - Number(y)),
                    );
                }),
            );
        });
    });
});
