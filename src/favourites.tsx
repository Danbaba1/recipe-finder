import { createContext, useContext, useState, type ReactNode } from "react";

interface FavouritesValue {
  saved: string[];
  toggle: (id: string) => void;
}

export const FavouritesContext = createContext<FavouritesValue | null>(null);

export function useFavourites() {
  const value = useContext(FavouritesContext);
  if (value === null)
    throw new Error("useFavourites must be used inside the provider");
  return value;
}

export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);

  function toggle(id: string) {
    setSaved((current) =>
      current.includes(id) ? current.filter((s) => s !== id) : [...current, id],
    );
  }

  return (
    <FavouritesContext.Provider value={{ saved, toggle }}>
      {children}
    </FavouritesContext.Provider>
  );
}
