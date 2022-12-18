import { cmp, eq, Ordering } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "../src/date.js";

describe("date.js", () => {
    describe("Date", () => {
        specify("#[Eq.eq]", () => {
            fc.assert(
                fc.property(fc.date(), fc.date(), (x, y) => {
                    expect(eq(x, y)).to.equal(x.getTime() === y.getTime());
                }),
            );
        });

        specify("#[Ord.cmp]", () => {
            fc.assert(
                fc.property(fc.date(), fc.date(), (x, y) => {
                    expect(cmp(x, y)).to.equal(
                        Ordering.fromNumber(x.getTime() - y.getTime()),
                    );
                }),
            );
        });
    });
});
