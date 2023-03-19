import { cmb } from "@neotype/prelude/cmb.js";
import { cmp, eq, icmp, ieq } from "@neotype/prelude/cmp.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "./array.js";
import "./number.js";
import "./string.js";
import {
    expectLawfulEq,
    expectLawfulOrd,
    expectLawfulSemigroup,
} from "./_test/utils.js";

describe("array.js", () => {
    describe("Array", () => {
        describe("#[Eq.eq]", () => {
            it("compares the arrays lexicographically", () => {
                fc.assert(
                    fc.property(
                        fc.array(fc.float({ noNaN: true })),
                        fc.array(fc.float({ noNaN: true })),
                        (xs, ys) => {
                            expect(eq(xs, ys)).to.equal(ieq(xs, ys));
                        },
                    ),
                );
            });

            it("implements a lawful equivalence relation", () => {
                expectLawfulEq(fc.array(fc.float({ noNaN: true })));
            });
        });

        describe("#[Ord.cmp]", () => {
            it("compares the arrays lexicographically", () => {
                fc.assert(
                    fc.property(
                        fc.array(fc.float({ noNaN: true })),
                        fc.array(fc.float({ noNaN: true })),
                        (xs, ys) => {
                            expect(cmp(xs, ys)).to.equal(icmp(xs, ys));
                        },
                    ),
                );
            });

            it("implements a lawful total order", () => {
                expectLawfulOrd(fc.array(fc.float({ noNaN: true })));
            });
        });

        describe("#[Semigroup.cmb]", () => {
            it("concatenates the arrays", () => {
                fc.assert(
                    fc.property(
                        fc.array(fc.anything()),
                        fc.array(fc.anything()),
                        (xs, ys) => {
                            expect(cmb(xs, ys)).to.deep.equal([...xs, ...ys]);
                        },
                    ),
                );
            });

            it("implements a lawful semigroup", () => {
                expectLawfulSemigroup(fc.array(fc.string()));
            });
        });
    });

    describe("ReadonlyArray", () => {
        describe("#[Eq.eq]", () => {
            it("compares the readonly array and non-readonly array to each other", () => {
                const xs: readonly number[] = [];
                const ys: number[] = [];
                eq(xs, xs);
                eq(xs, ys);
                eq(ys, xs);
            });
        });

        describe("#[Ord.cmp]", () => {
            it("compares the readonly array and non-readonly array to each other", () => {
                const xs: readonly number[] = [];
                const ys: number[] = [];
                cmp(xs, xs);
                cmp(xs, ys);
                cmp(ys, xs);
            });
        });

        describe("#[Semigroup.cmb]", () => {
            it("combines the readonly array and non-readonly array with each other", () => {
                const xs: readonly unknown[] = [];
                const ys: unknown[] = [];
                cmb(xs, xs);
                cmb(xs, ys);
                cmb(ys, xs);
            });
        });
    });

    describe("tuple literal", () => {
        describe("#[Eq.eq]", () => {
            it("compares the tuple literals lexicographically", () => {
                fc.assert(
                    fc.property(
                        fc.float({ noNaN: true }),
                        fc.string(),
                        fc.float({ noNaN: true }),
                        fc.string(),
                        (a, x, b, y) => {
                            const xs: [number, string] = [a, x];
                            const ys: [number, string] = [b, y];
                            expect(eq(xs, ys)).to.equal(eq(a, b) && eq(x, y));
                        },
                    ),
                );
            });

            it("implements a lawful equivalence relation", () => {
                expectLawfulEq(
                    fc.tuple(fc.float({ noNaN: true }), fc.string()),
                );
            });
        });

        describe("#[Ord.cmp]", () => {
            it("compares the tuple literals lexicographically", () => {
                fc.assert(
                    fc.property(
                        fc.float({ noNaN: true }),
                        fc.string(),
                        fc.float({ noNaN: true }),
                        fc.string(),
                        (a, x, b, y) => {
                            const xs: [number, string] = [a, x];
                            const ys: [number, string] = [b, y];
                            expect(cmp(xs, ys)).to.equal(
                                cmb(cmp(a, b), cmp(x, y)),
                            );
                        },
                    ),
                );
            });

            it("implements a lawful total order", () => {
                expectLawfulOrd(
                    fc.tuple(fc.float({ noNaN: true }), fc.string()),
                );
            });
        });
    });

    describe("readonly tuple literal", () => {
        describe("#[Eq.eq]", () => {
            it("compares the readonly tuple literal and non-readonly tuple literal to each other", () => {
                const xs: readonly [number, string] = [0, ""];
                const ys: [number, string] = [0, ""];
                eq(xs, xs);
                eq(xs, ys);
                eq(ys, xs);
            });
        });

        describe("#[Ord.cmp]", () => {
            it("compares the readonly tuple literal and non-readonly tuple literal to each other", () => {
                const xs: readonly [number, string] = [0, ""];
                const ys: [number, string] = [0, ""];
                cmp(xs, xs);
                cmp(xs, ys);
                cmp(ys, xs);
            });
        });
    });
});
