import { useFavourites } from "./favourites";

export function SaveButton({ id }: { id: string }) {
    const { saved, toggle } = useFavourites();
    return (
        <button type= "button" onClick = {() => toggle(id)
}>
    { saved.includes(id) ? "Saved" : "Save" }
    </button>
  );
}