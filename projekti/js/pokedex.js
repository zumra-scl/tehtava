import { fetchGeneration, fetchPokemon } from "./api.js";
import { renderPokemonList } from "./render.js";

let currentPokemonList = [];

export function setPokemonList(list) {
  currentPokemonList = list;
}

// Hakutoiminto
export function filterPokemon(searchText, selectedType) {
  searchText = searchText.toLowerCase();

  const filtered = currentPokemonList.filter((pokemon) => {
    const matchesName = pokemon.name.toLowerCase().includes(searchText);
    const matchesType =
      selectedType === "" || pokemon.types.includes(selectedType);

    return matchesName && matchesType;
  });

  renderPokemonList(filtered);
}

document
  .getElementById("generation-select")
  .addEventListener("change", async (e) => {
    const gen = e.target.value;

    // 1. Hae generaatio
    const speciesList = await fetchGeneration(gen);

    // 2. Hae Pokémon-data
    const pokemonData = [];
    for (const p of speciesList) {
      const info = await fetchPokemon(p.url);
      if (info) pokemonData.push(info);
    }

    setPokemonList(pokemonData);
    renderPokemonList(pokemonData);
  });
