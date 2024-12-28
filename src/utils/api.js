// src/utils/api.js
import axios from "axios";

export const fetchPokemons = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
  const data = await response.json();

  const pokemons = await Promise.all(
    data.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const details = await response.json();
      return {
        id: details.id,
        name: details.name,
        types: details.types.map((type) => type.type.name),
        sprites: details.sprites,
      };
    })
  );

  return pokemons;
};