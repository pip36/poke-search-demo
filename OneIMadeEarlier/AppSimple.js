import { useState } from "react";
import { fetchPokemonRxjs, fetchPokemonAxios } from "./api";

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
        //axios err.response?.status
        if (err.status === 404) {
          setError("NotFound");
        } else {
          setError("Error");
        }
      });

  return (
    <div>
      <h1>Pokemon Search</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e.target.elements.name.value);
        }}
      >
        <label htmlFor="name">Search</label>
        <input id="name" name="name"></input>
      </form>

      <img
        src={pokemon.sprites?.front_default}
        alt={pokemon.name + "-sprite"}
      />

      {error === "Error" && <p>{"Oops I'm broken!"}</p>}
      {error === "NotFound" && <p>{"Not a pokemon"}</p>}
    </div>
  );
}

export default App;
