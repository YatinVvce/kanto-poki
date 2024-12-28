import React from "react";

const PokemonCard = ({ pokemon }) => {
  const getPokemonImage = (pokemon) => {
    return (
      pokemon.sprites?.other["official-artwork"]?.front_default ||
      "https://via.placeholder.com/100"
    );
  };

  return (
    <div className="card">
      <img
        src={getPokemonImage(pokemon)}
        alt={pokemon.name}
        className="pokemon-image"
      />
      <h2>{pokemon.name}</h2>

      <div className="card-hover-details">
        <img
          src={
            pokemon.sprites?.other["official-artwork"]?.front_default ||
            "https://via.placeholder.com/100"
          }
          alt={`${pokemon.name} Hover`}
        />
        <h3>Abilities</h3>
        <p>
          {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default PokemonCard;
