import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { RecipeList } from "./pages/RecipeList.tsx";
import { RecipePage } from "./pages/RecipePage.tsx";
import { useFavourites, FavouritesContext } from "./favourites.tsx";

import "./App.css";

function Header() {
  const { saved } = useFavourites();

  return (
    <header>
      <Link to="/">Recipe finder</Link>
      <p>Saved ({saved.length})</p>
    </header>
  );
}

export default function App() {
  const [saved, setSaved] = useState<string[]>([]);

  function toggle(id: string) {
    setSaved(
      saved.includes(id) ? saved.filter((s) => s !== id) : [...saved, id],
    );
  }
  return (
    <FavouritesContext.Provider value={{ saved, toggle }}>
      <BrowserRouter basename="/recipe-finder">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/recipes/:id" element={<RecipePage />} />
          </Routes>
        </main>
        <footer>
          <Link to="/recipes/ofada-stew">An old link</Link>
        </footer>
      </BrowserRouter>
    </FavouritesContext.Provider>
  );
}
