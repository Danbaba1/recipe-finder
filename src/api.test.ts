import { isRecipe } from './api';
import { test, expect } from 'vitest';

test('isRecipe rejects a recipe withiut ingredients', () => {
    expect(isRecipe({ id: 'a', name: 'A', minutes: 5 })).toBe(false);
})