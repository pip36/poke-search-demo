import axios from "axios";
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

export const fetchPokemon = (pokemonName) =>
  fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName).then((r) => {
    return r.json();
  });

export const fetchPokemonAxios = (pokemonName) =>
  axios
    .get("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
    .then((r) => Promise.resolve(r.data));

export const fetchPokemonRxjs = (pokemonName) =>
  ajax
    .getJSON("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
    .pipe(map((response) => response))
    .toPromise();
