import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useFavourites } from "../favourites.tsx";
import { getJSON, isRecipe } from "../api.ts";

export interface Recipe {
  id: string;
  name: string;
  minutes: number;
  ingredients: string[];
}

type RecipeState =
  | { status: "loading" }
  | { status: "success"; recipe: Recipe }
  | { status: "not-found" }
  | { status: "error"; message: string };

export function RecipePage() {
  const { id } = useParams();
  const { saved, toggle } = useFavourites();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [state, setState] = useState<RecipeState>({ status: "loading" });

  useEffect(() => {
    let ignore = false;
    if (!id) {
      setState({ status: "not-found" });
      return;
    }

    setState({ status: "loading" });
    getJSON(`/api/recipes/${id}`).then(
      (data) => {
        if (ignore) return;
        if (isRecipe(data)) {
          setState({ status: "success", recipe: data });
        } else {
          setState({
            status: "error",
            message: "Unexpected data from the server",
          });
        }
      },
      () => {
        if (!ignore) setState({ status: "not-found" });
      },
    );
    return () => {
      ignore = true;
    };
  }, [id]);
  if (state.status === "loading") return <p>Loading recipe{"\u2026"}</p>;
  if (state.status === "not-found")
    return (
      <>
        <p>Recipe not found</p>
        <Link to={q ? `/?q=${q}` : "/"}>Back to recipes</Link>
      </>
    );
  if (state.status === "error") return <p>{state.message}</p>;
  return (
    <>
      <h1>{state.recipe.name}</h1>
      <p>{state.recipe.minutes} minutes</p>
      <ul>
        {state.recipe.ingredients.map((ingredient) => {
          return <li key={ingredient}>{ingredient}</li>;
        })}
      </ul>
      <button type="button" onClick={() => toggle(state.recipe.id)}>
        {saved.includes(state.recipe.id) ? "Saved" : "Save"}
      </button>
      <Link to={q ? `/?q=${q}` : "/"}>Back to recipes</Link>
    </>
  );
}
