import { useState } from "react";
import { Grid, Typography, TextField } from "@material-ui/core";
import { PokemonSummary } from "./PokemonSummary";
import { fetchPokemonRxjs, fetchPokemonAxios, fetchPokemon } from "./api";

function App() {
  const [pokemon, setPokemon] = useState({});
  const [error, setError] = useState("");

  const onSubmit = (pokemonName) =>
    fetchPokemonRxjs(pokemonName)
      .then((data) => {
        setPokemon(data);
      })
      .catch((err) => {
        //rxjs err.status
        //axios err.response.status
        if (err.status === 404) {
          setError("NotFound");
        } else {
          setError("Error");
        }
      });

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <Grid container justify="center">
        <Typography variant="h2">Pokemon Search</Typography>
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

        {error === "Error" && <Typography>{"Oops I'm broken!"}</Typography>}
        {error === "NotFound" && (
          <Typography>{"'dave' is not a pokemon"}</Typography>
        )}
      </Grid>
    </div>
  );
}

export default App;
