import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server, rest } from "./mocks/server.js";
import App from "./App";

describe("Poke Search App", () => {
  test("Main heading text is visible", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { name: /Pokemon search/i });
    expect(heading).toBeInTheDocument();
  });

  test.each`
    pokemon      | src
    ${"pikachu"} | ${"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"}
    ${"raichu"}  | ${"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png"}
  `("Can search for $pokemon and view sprite", async ({ pokemon, src }) => {
    render(<App />);

    const searchBox = screen.getByLabelText(/Search/i);
    userEvent.type(searchBox, pokemon + "{enter}");

    const sprite = await screen.findByAltText(pokemon + "-sprite");
    expect(sprite).toHaveAttribute("src", src);
  });

  test("Displays error message when the API fails", async () => {
    server.use(
      rest.get(
        "https://pokeapi.co/api/v2/pokemon/pikachu",
        async (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    render(<App />);

    const searchBox = screen.getByLabelText(/Search/i);
    userEvent.type(searchBox, "pikachu{enter}");

    expect(await screen.findByText(`Oops I'm broken!`)).toBeInTheDocument();
  });

  test("Displays not found message when pokemon does not exist", async () => {
    render(<App />);

    const searchBox = screen.getByLabelText(/Search/i);
    userEvent.type(searchBox, "dave{enter}");

    expect(await screen.findByText(`Not a pokemon`)).toBeInTheDocument();
  });
});
