import { cmb } from "@neotype/prelude/cmb.js";
import { expect } from "chai";
import * as fc from "fast-check";
import "../src/promise.js";
import "../src/string.js";

describe("promise.js", () => {
    describe("Promise", () => {
        specify("#[Semigroup.cmb]", async () => {
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
    });
});
