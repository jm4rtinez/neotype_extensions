import { cmb, Semigroup } from "@neotype/prelude/cmb.js";
import { cmp, Eq, eq, le, Ord } from "@neotype/prelude/cmp.js";
import * as fc from "fast-check";
import { expect } from "vitest";

export function expectLawfulEq<A extends Eq<A>>(arb: fc.Arbitrary<A>): void {
    fc.assert(
        fc.property(arb, (x) => {
            expect(eq(x, x), "reflexivity").to.be.true;
        }),
    );

    fc.assert(
        fc.property(arb, arb, (x, y) => {
            expect(eq(x, y), "symmetry").to.equal(eq(y, x));
        }),
    );

    fc.assert(
        fc.property(arb, (x) => {
            const y = x,
                z = x;
            expect(eq(x, y) && eq(y, z) && eq(x, z), "transitivity").to.be.true;
        }),
    );
}

export function expectLawfulOrd<A extends Ord<A>>(arb: fc.Arbitrary<A>): void {
    fc.assert(
        fc.property(arb, (x) => {
            expect(le(x, x), "reflexivity").to.be.true;
        }),
    );

    fc.assert(
        fc.property(arb, arb, (x, y) => {
            expect(le(x, y) && le(y, x), "antisymmetry").to.equal(eq(x, y));
        }),
    );

    fc.assert(
        fc.property(arb, arb, arb, (x, y, z) => {
            const [x1, y1, z1] = [x, y, z].sort((a, b) =>
                cmp(a, b).toNumber(),
            ) as [A, A, A];
            expect(le(x1, y1) && le(y1, z1) && le(x1, z1), "transitivity").to.be
                .true;
        }),
    );

    fc.assert(
        fc.property(arb, arb, (x, y) => {
            expect(le(x, y) || le(y, x), "comparability").to.be.true;
        }),
    );
}

export function expectLawfulSemigroup<A extends Semigroup<A> & Eq<A>>(
    arb: fc.Arbitrary<A>,
): void {
    fc.assert(
        fc.property(arb, arb, arb, (x, y, z) => {
            expect(eq(cmb(x, cmb(y, z)), cmb(cmb(x, y), z)), "associativity").to
                .be.true;
        }),
    );
}
