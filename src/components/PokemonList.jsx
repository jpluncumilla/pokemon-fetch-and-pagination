import React, { useEffect } from "react";
import { Pagination } from "@mui/material";

const PokemonList = () => {
  function fetchPokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((poke) => console.log(poke))
      .catch((error) => console.error("Error fetching Pokémon:", error));
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div>
      <Pagination count={300} variant='outlined' shape='rounded' />
    </div>
  );
};
export default PokemonList;
