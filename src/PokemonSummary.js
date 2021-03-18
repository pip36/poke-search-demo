import { Grid, Typography } from "@material-ui/core";

export const PokemonSummary = ({ pokemon }) => {
  return pokemon.name ? (
    <>
      <Grid item xs={12}>
        <Typography variant="h4">Name: {pokemon.name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <img
          src={pokemon.sprites?.front_default}
          alt={pokemon.name + "-sprite"}
        />
      </Grid>
    </>
  ) : null;
};
