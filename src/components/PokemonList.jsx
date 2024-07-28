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
    const offset = (currentPage - 1) * itemsPerPage;
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
      );
      const data = await response.json();
      console.log(data.results);
      setPokemon(data.results);
      setPages(Math.ceil(151 / itemsPerPage));
    } catch (err) {
      console.log("Error fetching Pokémon:", err);
    }
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      {pokemon.map((e) => (
        <h1>{e.name}</h1>
      ))}
      <Pagination
        count={pages}
        page={currentPage}
        onChange={handleChange}
        variant='outlined'
        shape='rounded'
        color='secondary'
      />
    </div>
  );
};
export default PokemonList;
