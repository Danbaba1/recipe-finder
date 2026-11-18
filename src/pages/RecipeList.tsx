import { isRecipeList, getJSON } from "../api";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

interface Recipe {
  id: string;
  name: string;
  minutes: number;
  ingredients: string[];
}

type ListState =
  | { status: "loading" }
  | { status: "success"; recipes: Recipe[] }
  | { status: "error"; message: string };

export function RecipeList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [state, setState] = useState<ListState>({ status: "loading" });

  useEffect(() => {
    let ignore = false;
    getJSON("/api/recipes").then(
      (data) => {
        if (ignore) return;
        if (isRecipeList(data)) setState({ status: "success", recipes: data });
        else
          setState({
            status: "error",
            message: "Unexpected data from the server",
          });
      },
      (err: Error) => {
        if (!ignore) setState({ status: "error", message: err.message });
      },
    );
    return () => {
      ignore = true;
    };
  }, []);

  if (state.status === "loading") return <p>Loading recipes{"\u2026"}</p>;
  if (state.status === "error") return <p>{state.message}</p>;

  const filtered = state.recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <>
      <input
        aria-label="Search recipes"
        value={q}
        onChange={(e) => setSearchParams({ q: e.target.value })}
      />
      {filtered.length === 0 ? (
        <p>No recipes match "{q}"</p>
      ) : (
        <ul>
          {filtered.map((recipe: Recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}?q=${q}`}>{recipe.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
