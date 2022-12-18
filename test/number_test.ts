import { cmp, eq, Ordering } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "../src/number.js";

describe("number.js", () => {
    describe("Number", () => {
        specify("#[Eq.eq]", () => {
            fc.assert(
                fc.property(
                    fc.float({ noNaN: true }),
                    fc.float({ noNaN: true }),
                    (x, y) => {
                        expect(eq(x, y)).to.equal(x === y);
                    },
                ),
            );
        });

        specify("#[Ord.cmp]", () => {
            fc.assert(
                fc.property(
                    fc.float({ noNaN: true }),
                    fc.float({ noNaN: true }),
                    (x, y) => {
                        expect(cmp(x, y)).to.equal(Ordering.fromNumber(x - y));
                    },
                ),
            );
        });
    });
});
