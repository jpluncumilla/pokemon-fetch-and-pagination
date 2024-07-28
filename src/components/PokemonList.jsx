import React, { useEffect } from "react";

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

  return <div>Pokemon List</div>;
};
export default PokemonList;
