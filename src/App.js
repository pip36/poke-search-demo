import { useState } from "react";
import { Grid, Typography, TextField } from "@material-ui/core";
import { PokemonSummary } from "./PokemonSummary";
import { fetchPokemonRxjs, fetchPokemonAxios, fetchPokemon } from "./api";

function App() {
  const [pokemon, setPokemon] = useState({});
  const [hasError, setHasError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const onSubmit = (pokemonName) =>
    fetchPokemonRxjs(pokemonName)
      .then((data) => {
        setPokemon(data);
      })
      .catch((err) => {
        if (err.status === 404) {
          setNotFound(true);
        } else {
          setHasError(true);
        }
      });

  return (
    <div className="App" style={{ padding: "2rem", textAlign: "center" }}>
      <Grid container justify="center">
        <Typography variant="h2">Poké Search</Typography>
        <Grid item xs={12}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e.target.elements.name.value);
            }}
          >
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              id="search"
              name="name"
              type="text"
            />
          </form>
        </Grid>
        <PokemonSummary pokemon={pokemon} />

        {hasError && <Typography>{"Oops I'm broken!"}</Typography>}
        {notFound && <Typography>{"'dave' is not a pokemon"}</Typography>}
      </Grid>
    </div>
  );
}

export default App;
