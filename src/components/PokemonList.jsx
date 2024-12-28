import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=100")
      .then((response) => response.json())
      .then((data) => {
        const pokemonData = data.results;
        const pokemonDetailsPromises = pokemonData.map((pokemon) =>
          fetch(pokemon.url)
            .then((response) => response.json())
            .then((details) => ({
              ...details,
              name: pokemon.name,
              url: pokemon.url,
            }))
        );
        Promise.all(pokemonDetailsPromises).then((pokemonsWithDetails) => {
          setPokemons(pokemonsWithDetails);
          setFilteredPokemons(pokemonsWithDetails);
        });
      });
  }, []);

  useEffect(() => {
    let filtered = pokemons;

    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === filter)
      );
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, filter, pokemons]);

  const getPokemonImage = (pokemon) => {
    if (
      pokemon.sprites &&
      pokemon.sprites.other &&
      pokemon.sprites.other["official-artwork"]
    ) {
      return pokemon.sprites.other["official-artwork"].front_default;
    } else {
      return "https://via.placeholder.com/100";
    }
  };

  const getAbilities = (pokemon) => {
    return pokemon.abilities.map((ability) => ability.ability.name).join(", ");
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/background.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <header>
          <h1>Poki-kanto</h1>
          <input
            type="text"
            placeholder="Search Pokémon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </header>

        <div className="filters">
          <select
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="filter-dropdown"
          >
            <option value="">All</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="electric">Electric</option>
            <option value="bug">Bug</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPokemons.map((pokemon, index) => (
            <div key={index} className="card">
              <Link to={`/pokemon/${pokemon.name}`} className="card-link">
                <img
                  src={getPokemonImage(pokemon)}
                  alt={pokemon.name}
                  className="pokemon-image"
                />
                <h2>{pokemon.name}</h2>
              </Link>

              <div className="card-hover-details">
                <img
                  src={getPokemonImage(pokemon)}
                  alt={`${pokemon.name} Hover`}
                  className="pokemon-image"
                />
                <h3>{pokemon.name}</h3>
                <p>
                  Types:{" "}
                  {pokemon.types.map((type) => type.type.name).join(", ")}
                </p>
                <p>Abilities: {getAbilities(pokemon)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
