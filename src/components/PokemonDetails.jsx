import React from "react";

const PokemonDetails = ({ pokemon }) => {
  if (!pokemon) return null;

  const abilities = pokemon.abilities
    ?.map((ability, index) => ability.ability.name)
    .join(", ");

  return (
    <div className="pokemon-details">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />

      <h3>Details</h3>
      <p>
        <strong>Type(s):</strong>{" "}
        {pokemon.types?.map((t) => t.type.name).join(", ")}
      </p>

      {/* Displaying Abilities */}
      <p>
        <strong>Abilities:</strong> {abilities || "No abilities listed"}
      </p>

      {/* If more information exists */}
      <p>Base Experience: {pokemon.base_experience}</p>
      <p>Height: {pokemon.height} decimeters</p>
      <p>Weight: {pokemon.weight} hectograms</p>
    </div>
  );
};

export default PokemonDetails;
