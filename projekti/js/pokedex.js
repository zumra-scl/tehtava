import { fetchGeneration, fetchPokemon } from "./api.js";
import { openModal } from "./modal.js";
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
