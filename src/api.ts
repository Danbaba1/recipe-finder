export interface Recipe {
    id: string;
    name: string;
    minutes: number;
    ingredients: string[];
}

const DATA: Recipe[] = [
    { id: 'jollof', name: 'Jollof rice', minutes: 60, ingredients: ['Rice', 'Tomatoes', 'Peppers', 'Onions'] },
    { id: 'puff-puff', name: 'Puff-puff', minutes: 45, ingredients: ['Flour', 'Yeast', 'Sugar', 'Water'] },
    { id: 'moi-moi', name: 'Moi moi', minutes: 90, ingredients: ['Beans', 'Peppers', 'Onions'] },
    { id: 'egusi', name: 'Egusi soup', minutes: 75, ingredients: ['Egusi', 'Spinach', 'Palm oil'] },
];

export function getJSON(url: string): Promise<unknown> {
    return new Promise((resolve, reject) =>
        setTimeout(() => {
            if (url === '/api/recipes') return resolve(DATA.map(({ id, name, minutes }) => ({ id, name, minutes, ingredients: [] })));
            const match = /^\/api\/recipes\/([\w-]+)$/.exec(url);
            const recipe = match && DATA.find((r) => r.id === match[1]);
            if (recipe) return resolve(recipe);
            reject(new Error('Not found: ' + url));
        }, 400),
    );
}

export function isRecipeList(value: unknown): value is Recipe[] {
    return Array.isArray(value) && value.every(isRecipe);
}

export function isRecipe(value: unknown): value is Recipe {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const recipe = value as Record<string, unknown>

    return (
        typeof recipe.id === 'string' && typeof recipe.name === 'string'
        && typeof recipe.minutes === 'number' && Array.isArray(recipe.ingredients)
        && recipe.ingredients.every((item) => typeof item === 'string')
    )
}