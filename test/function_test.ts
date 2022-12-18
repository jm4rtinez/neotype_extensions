import { cmb } from "@neotype/prelude/cmb.js";
import { id } from "@neotype/prelude/fn.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "../src/function.js";
import "../src/string.js";

describe("function.js", () => {
    describe("Function", () => {
        specify("#[Semigroup.cmb]", () => {
            fc.assert(
                fc.property(fc.string(), (x) => {
                    const f = cmb(id<string>, id);
                    const result = f(x);
                    expect(result).to.equal(cmb(x, x));
                }),
            );
        });
    });
});
