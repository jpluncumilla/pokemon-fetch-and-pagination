import React, { useEffect, useState } from "react";
import {
  Pagination,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const PokemonList = () => {
  //Pass fetched pokemons to array
  const [_pokemon, setPokemon] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonDetails, setPokemonDetails] = useState([]);
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
      setPokemon(data.results);
      setPages(Math.ceil(151 / itemsPerPage));

      //Pokemon Details (Nested data)
      const detailsFetch = data.results.map((pokemon) =>
        fetch(pokemon.url).then((res) => res.json())
      );
      const details = await Promise.all(detailsFetch);
      setPokemonDetails(details);
      console.log(details);
    } catch (err) {
      console.log("Error fetching Pokémon:", err);
    }
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <h1>MetaPhase API Fetching/Pagination Assessment</h1>
      <div className='cards'>
        {pokemonDetails.map((e, i) => (
          <div key={i + 1}>
            <Card sx={{ width: 200 }}>
              <CardMedia
                sx={{ height: 190 }}
                component='img'
                image={e.sprites?.front_default}
                title={e.name}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {e?.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Base Exp: {e.base_experience}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Height: {e.height}
                </Typography>{" "}
                <Typography variant='body2' color='text.secondary'>
                  Weight: {e.weight}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Pokemon Type: {e.types[0].type.name}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className='pagination'>
        <Pagination
          count={pages}
          page={currentPage}
          onChange={handleChange}
          variant='outlined'
          shape='rounded'
          color='secondary'
        />
      </div>
    </div>
  );
};
export default PokemonList;
