import { cmp, eq, Ordering } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "./date.js";
import { expectLawfulEq, expectLawfulOrd } from "./_test/utils.js";

describe("date.js", () => {
    describe("Date", () => {
        describe("#[Eq.eq]", () => {
            it("compares the dates using their numerical representation", () => {
                fc.assert(
                    fc.property(fc.date(), fc.date(), (x, y) => {
                        expect(eq(x, y)).to.equal(x.getTime() === y.getTime());
                    }),
                );
            });

            it("implements a lawful equivalence relation", () => {
                expectLawfulEq(fc.date());
            });
        });

        describe("#[Ord.cmp]", () => {
            it("compares the dates using their numerical representation", () => {
                fc.assert(
                    fc.property(fc.date(), fc.date(), (x, y) => {
                        expect(cmp(x, y)).to.equal(
                            Ordering.fromNumber(x.getTime() - y.getTime()),
                        );
                    }),
                );
            });

            it("implements a lawful total order", () => {
                expectLawfulOrd(fc.date());
            });
        });
    });
});
