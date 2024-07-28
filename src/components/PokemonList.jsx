import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";

const PokemonList = () => {
  //Pass fetched pokemons to array
  const [pokemon, setPokemon] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPokemon();
  }, [currentPage]);

  const fetchPokemon = async () => {
    // offset param for pagination example = ?limit=60&offset=60
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}`
    );
    const data = await response.json();
    try {
      console.log(data.results);
      setPokemon(data.results);
    } catch (err) {
      console.log("Error fetching Pokémon:", err);
    }
  };

  return (
    <div>
      {pokemon.map((e) => (
        <h1>{e.name}</h1>
      ))}
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
