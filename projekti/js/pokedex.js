import { fetchGeneration, fetchPokemon } from "./api.js";
import { renderPokemonList } from "./render.js";
import { openModal } from "./modal.js";

let currentPokemonList = [];

export function setPokemonList(list) {
  currentPokemonList = list;
}

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
  .getElementById("generationSelect")
  .addEventListener("change", async (e) => {
    const gen = e.target.value;

    const speciesList = await fetchGeneration(gen);
    const pokemonData = [];

    for (const p of speciesList) {
      const info = await fetchPokemon(p.url);
      if (info) pokemonData.push(info);
    }

    setPokemonList(pokemonData);
    renderPokemonList(pokemonData.slice(0, 20));
  });

window.addEventListener("DOMContentLoaded", async () => {
  const defaultGen = "1";
  const speciesList = await fetchGeneration(defaultGen);
  const pokemonData = [];

  for (const p of speciesList) {
    const info = await fetchPokemon(p.url);
    if (info) pokemonData.push(info);
  }

  setPokemonList(pokemonData);
  renderPokemonList(pokemonData.slice(0, 20));
});

document.getElementById("searchBtn").addEventListener("click", () => {
  const searchValue = document.getElementById("searchInput").value.trim();
  const selectedType = document.getElementById("typeFilter").value;
  filterPokemon(searchValue, selectedType);
});

document.getElementById("searchInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const searchValue = e.target.value.trim();
    const selectedType = document.getElementById("typeFilter").value;
    filterPokemon(searchValue, selectedType);
  }
});

document.getElementById("typeFilter").addEventListener("change", () => {
  const searchValue = document.getElementById("searchInput").value.trim();
  const selectedType = document.getElementById("typeFilter").value;
  filterPokemon(searchValue, selectedType);
});
