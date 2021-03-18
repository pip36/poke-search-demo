import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Poke Search App", () => {
  test("Main heading text is visible", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { name: /Poké search/i });
    expect(heading).toBeInTheDocument();
  });

  test.each([
    [
      "pikachu",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    ],
    [
      "raichu",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png",
    ],
  ])("Can search for %s", async (pokemon, src) => {
    render(<App />);

    expect(screen.queryByText(`Name: ${pokemon}`)).not.toBeInTheDocument();

    const searchBox = screen.getByLabelText(/Search/i);
    userEvent.type(searchBox, pokemon + "{enter}");

    expect(await screen.findByText(`Name: ${pokemon}`)).toBeInTheDocument();

    const sprite = screen.getByAltText(pokemon + "-sprite");
    expect(sprite).toHaveAttribute("src", src);
  });
});
