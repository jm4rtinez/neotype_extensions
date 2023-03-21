/*
 * Copyright 2022-2023 Josh Martinez
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { cmb } from "@neotype/prelude/cmb.js";
import { cmp, eq, Ordering } from "@neotype/prelude/cmp.js";
import * as fc from "fast-check";
import { describe, expect, it } from "vitest";
import "./string.js";
import {
    expectLawfulEq,
    expectLawfulOrd,
    expectLawfulSemigroup,
} from "./_test/utils.js";

describe("String", () => {
    describe("#[Eq.eq]", () => {
        it("compares the strings strictly", () => {
            fc.assert(
                fc.property(fc.string(), fc.string(), (x, y) => {
                    expect(eq(x, y)).to.equal(x === y);
                }),
            );
        });

        it("implements a lawful equivalence relation", () => {
            expectLawfulEq(fc.string());
        });
    });

    describe("#[Ord.cmp]", () => {
        it("compares the strings lexicographically by their character code points", () => {
            fc.assert(
                fc.property(fc.string(), fc.string(), (x, y) => {
                    expect(cmp(x, y)).to.equal(
                        x < y
                            ? Ordering.less
                            : x > y
                            ? Ordering.greater
                            : Ordering.equal,
                    );
                }),
            );
        });

        it("implements a lawful total order", () => {
            expectLawfulOrd(fc.string());
        });
    });

    describe("#[Semigroup.cmb]", () => {
        it("concatenates the strings", () => {
            fc.assert(
                fc.property(fc.string(), fc.string(), (x, y) => {
                    expect(cmb(x, y)).to.equal(x + y);
                }),
            );
        });

        it("implements a lawful semigroup", () => {
            expectLawfulSemigroup(fc.string());
        });
    });
});
