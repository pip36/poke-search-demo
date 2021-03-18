import { useState } from "react";
import axios from "axios";
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";
import { Grid, Typography, TextField } from "@material-ui/core";

const fetchPokemon = (pokemonName) =>
  fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName).then((r) => {
    return r.json();
  });

const fetchPokemonAxios = (pokemonName) =>
  axios
    .get("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
    .then((r) => Promise.resolve(r.data));

const fetchPokemonRxjs = (pokemonName) =>
  ajax
    .getJSON("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
    .pipe(map((response) => response))
    .toPromise();

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
        {pokemon.name && (
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
        )}

        {hasError && <Typography>{"Oops I'm broken!"}</Typography>}
        {notFound && <Typography>{"'dave' is not a pokemon"}</Typography>}
      </Grid>
    </div>
  );
}

export default App;
