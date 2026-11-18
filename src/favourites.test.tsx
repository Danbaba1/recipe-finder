import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { FavouritesProvider, useFavourites } from "./favourites";
import { SaveButton } from "./SaveButton";

function Count() {
  const { saved } = useFavourites();
  return <p>{`Saved (${saved.length})`}</p>;
}

describe("favourites", () => {
  test("saving a recipe updates the button", async () => {
    render(<SaveButton id="jollof" />, { wrapper: FavouritesProvider });
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getByRole("button", { name: "Saved" })).toBeInTheDocument();
  });

  test("pressing it again unsaves the recipe", async () => {
    render(<SaveButton id="jollof" />, { wrapper: FavouritesProvider });
    const button = screen.getByRole("button");
    await userEvent.click(button);
    await userEvent.click(button);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  test("the count follows the saved recipes", async () => {
    render(
      <>
        <Count />
        <SaveButton id="jollof" />
        <SaveButton id="egusi" />
      </>,
      { wrapper: FavouritesProvider },
    );
    expect(screen.getByText("Saved (0)")).toBeInTheDocument();
    const [first, second] = screen.getAllByRole("button");
    await userEvent.click(first);
    await userEvent.click(second);
    expect(screen.getByText("Saved (2)")).toBeInTheDocument();
  });
});

test("useFavourites throws outside the provider", () => {
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<Count />)).toThrow(/inside the provider/);
  spy.mockRestore();
});
