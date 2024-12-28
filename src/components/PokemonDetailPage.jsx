import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PokemonDetailPage = () => {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [pokemonName]);

  if (!pokemon) return <div>Loading...</div>;

  const getPokemonImage = () => {
    if (
      pokemon.sprites &&
      pokemon.sprites.other &&
      pokemon.sprites.other["official-artwork"]
    ) {
      return pokemon.sprites.other["official-artwork"].front_default;
    }
    return "https://via.placeholder.com/100";
  };

  return (
    <div className="container px-6 py-8">
      {/* Header */}
      <header className="mb-8 flex justify-center">
        <h1>Poki-kanto</h1>
      </header>

      {/* Pokemon Details Section */}
      <div className="pokemon-detail-content flex flex-col md:flex-row items-center">
        {/* Left Side - Image */}
        <div className="pokemon-image w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
          <img
            src={getPokemonImage()}
            alt={pokemon.name}
            className="w-64 h-64 md:w-96 md:h-96"
          />
        </div>

        {/* Right Side - Name, Types, Abilities, etc. */}
        <div className="pokemon-info w-full md:w-1/2 md:ml-6 flex flex-col justify-center items-start">
          <h2 className="text-5xl font-bold capitalize mb-6 text-center ">
            {pokemon.name} {/* Center the name */}
          </h2>

          {/* Details Section (2x2 Grid) */}
          <div className="pokemon-details grid grid-cols-2 gap-4 w-full mb-6 border border-gray-300 p-4">
            {/* Height */}
            <div className="pokemon-height border p-4 flex items-center justify-center">
              <strong>Height: </strong> {pokemon.height / 10} m
            </div>

            {/* Types */}
            <div className="pokemon-types border p-4 flex items-center justify-center">
              <strong>Types:</strong>{" "}
              {pokemon.types.map((type) => type.type.name).join(", ")}
            </div>

            {/* Abilities */}
            <div className="pokemon-abilities border p-4 flex items-center justify-center">
              <strong>Abilities: </strong>{" "}
              {pokemon.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </div>

            {/* Held Items */}
            <div className="pokemon-held-items border p-4 flex items-center justify-center">
              <strong>Held Items: </strong>{" "}
              {pokemon.held_items.length > 0
                ? pokemon.held_items.map((item, index) => (
                    <span key={index}>{item.item.name}</span>
                  ))
                : "None"}
            </div>

            {/* Moves */}
            <div className="pokemon-moves col-span-2 border p-4  justify-center ">
              <strong>Moves: </strong>{" "}
              {pokemon.moves.slice(0, 5).map((move, index) => (
                <span key={index}>
                  {move.move.name}
                  {""}
                  {index < pokemon.moves.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <Link
            to="/"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
