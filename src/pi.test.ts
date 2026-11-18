import { describe, expect, test } from "vitest";
import { isRecipe } from "./api";

const good = { id: "a", name: "A", minutes: 5, ingredients: ["Rice"] };

describe("isRecipe", () => {
    test("accepts a valid recipe", () => {
        expect(isRecipe(good)).toBe(true);
    });

    test("rejects a recipe without ingredients", () => {
        expect(isRecipe({ id: "a", name: "A", minutes: 5 })).toBe(false);
    });

    test("rejects null and non-objects", () => {
        expect(isRecipe(null)).toBe(false);
        expect(isRecipe("jollof")).toBe(false);
    });

    test("rejects ingredients that aren't all strings", () => {
        expect(isRecipe({ ...good, ingredients: ["Rice", 3] })).toBe(false);
    });
});