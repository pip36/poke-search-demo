import { useState, useEffect } from "react";
import axios from "axios";

export const usePokemon = (name) => {
  const [pokemon, setPokemon] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await axios.get("https://pokeapi.co/api/v2/pokemon/" + name);
        setPokemon(r.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("NotFound");
        } else {
          setError("Error");
        }
      }
    })();
  }, [name]);

  return { pokemon, error };
};
