import { cmb, Semigroup } from "@neotype/prelude/cmb.js";
import { Eq, eq } from "@neotype/prelude/cmp.js";
import { id } from "@neotype/prelude/fn.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "./function.js";
import "./string.js";

describe("function.js", () => {
    describe("Function", () => {
        describe("#[Semigroup.cmb]", () => {
            it("combines the function results", () => {
                fc.assert(
                    fc.property(fc.string(), (x) => {
                        const f = cmb(id<string>, id);
                        const result = f(x);
                        expect(result).to.equal(cmb(x, x));
                    }),
                );
            });

            it("implements a lawful semigroup", () => {
                function expectLawfulFunctionSemigroup<
                    A extends Semigroup<A> & Eq<A>,
                >(arb: fc.Arbitrary<A>): void {
                    type Id<in out A> = (x: A) => A;
                    fc.assert(
                        fc.property(arb, (x) => {
                            expect(
                                eq(
                                    cmb<Id<A>>(id, cmb(id, id))(x),
                                    cmb<Id<A>>(cmb(id, id), id)(x),
                                ),
                            ).to.be.true;
                        }),
                    );
                }

                expectLawfulFunctionSemigroup(fc.string());
            });
        });
    });
});
