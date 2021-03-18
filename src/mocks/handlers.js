import { rest } from "msw";
import { pikachu, raichu } from "./data/pokemon";

export const handlers = [
  rest.get(
    "https://pokeapi.co/api/v2/pokemon/:pokemonName",
    (req, res, ctx) => {
      const { pokemonName } = req.params;

      switch (pokemonName) {
        case "pikachu":
          return res(ctx.status(200), ctx.json(pikachu));
        case "raichu":
          return res(ctx.status(200), ctx.json(raichu));
        default:
          return res(ctx.status(404));
      }
    }
  ),
];
