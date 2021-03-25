import { Grid } from "@material-ui/core";

export const PokemonSummary = ({ pokemon }) => {
  return pokemon.name ? (
    <>
      <Grid item xs={12}>
        <img
          src={pokemon.sprites?.front_default}
          alt={pokemon.name + "-sprite"}
        />
      </Grid>
    </>
  ) : null;
};
