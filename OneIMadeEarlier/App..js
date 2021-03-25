import { useState } from "react";
import { Grid, Typography, TextField } from "@material-ui/core";
import { PokemonSummary } from "./PokemonSummary";
import { usePokemon } from "./usePokemon";

function App() {
  const [name, setName] = useState("");
  const { pokemon, error } = usePokemon(name);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <Grid container justify="center">
        <Typography variant="h2">Pokemon Search</Typography>
        <Grid item xs={12}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setName(e.target.elements.name.value);
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
        {error === "NotFound" && <Typography>{"Not a pokemon"}</Typography>}
      </Grid>
    </div>
  );
}

export default App;
