import { cmb, type Semigroup } from "@neotype/prelude/cmb.js";
import { eq, type Eq } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "./promise.js";
import "./string.js";

describe("promise.js", () => {
    describe("Promise", () => {
        describe("#[Semigroup.cmb]", () => {
            it("combines the fulfilled results", async () => {
                await fc.assert(
                    fc.asyncProperty(fc.string(), fc.string(), async (x, y) => {
                        const result = await cmb(
                            Promise.resolve(x),
                            Promise.resolve(y),
                        );
                        expect(result).to.equal(cmb(x, y));
                    }),
                );
            });

            it("implements a lawful semigroup", async () => {
                async function expectLawfulPromiseSemigroup<
                    A extends Semigroup<A> & Eq<A>,
                >(arb: fc.Arbitrary<Promise<A>>): Promise<void> {
                    await fc.assert(
                        fc.asyncProperty(arb, arb, arb, async (x, y, z) => {
                            const t0 = await cmb(x, cmb(y, z));
                            const t1 = await cmb(cmb(x, y), z);
                            expect(eq(t0, t1)).to.be.true;
                        }),
                    );
                }

                await expectLawfulPromiseSemigroup(
                    fc.string().map((x) => Promise.resolve(x)),
                );
            });
        });
    });
});
