import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";

const PokemonList = () => {
  //Pass fetched pokemons to array
  const [pokemon, setPokemon] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  function fetchPokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((poke) => console.log(poke))
      .catch((error) => console.error("Error fetching Pokémon:", error));
  }

  useEffect(() => {
    fetchPokemon();
  }, [currentPage]);

  return (
    <div>
      <Pagination
        count={pages}
        page={currentPage}
        variant='outlined'
        shape='rounded'
      />
    </div>
  );
};
export default PokemonList;
