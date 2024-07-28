import React, { useEffect, useState } from "react";
import {
  Pagination,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const PokemonList = () => {
  //Pass fetched pokemons to array
  const [pokemon, setPokemon] = useState([]);
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
      console.log(data.results);
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
      {pokemonDetails.map((e, i) => (
        <div key={i + 1}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 190 }}
              component='img'
              image={e.sprites?.front_shiny}
              title={e.name}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {e?.name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Share</Button>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        </div>
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
