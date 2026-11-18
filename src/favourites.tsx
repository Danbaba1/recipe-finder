import { createContext, useContext } from "react";

interface FavouritesValue {
  saved: string[];
  toggle: (id: string) => void;
}

export const FavouritesContext = createContext<FavouritesValue | null>(null);

export function useFavourites() {
  const favorite = useContext(FavouritesContext);

  if (favorite === null)
    throw new Error("useFavourites must be used inside the provider");
  return favorite;
}
