import { useState } from "react";
import axios from "axios";
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

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
    <div className="App">
      <h1>Poké Search</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e.target.elements.name.value);
        }}
      >
        <label htmlFor="search">Search</label>
        <input id="search" name="name" type="text" />
      </form>

      <div>Name: {pokemon.name}</div>
      <img
        src={pokemon.sprites?.front_default}
        alt={pokemon.name + "-sprite"}
      />

      {hasError && <div>{"Oops I'm broken!"}</div>}
      {notFound && <div>{"'dave' is not a pokemon"}</div>}
    </div>
  );
}

export default App;
