import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server, rest } from "./mocks/server.js";
import App from "./App";

describe("Poke Search App", () => {
  test.skip("Main heading text is visible", () => {
    render(<App />);
  });

  test.skip.each`
    pokemon      | src
    ${"pikachu"} | ${"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"}
    ${"raichu"}  | ${"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png"}
  `("Can search for $pokemon and view sprite", async ({ pokemon, src }) => {
    render(<App />);
  });

  test.skip("Displays not found message when pokemon does not exist", async () => {
    render(<App />);
  });

  test.skip("Displays error message when the API fails", async () => {
    server.use(
      rest.get(
        "https://pokeapi.co/api/v2/pokemon/pikachu",
        async (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    render(<App />);
  });
});
