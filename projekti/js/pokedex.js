import { fetchGeneration, fetchPokemon } from "./api.js";
import { renderPokemonList } from "./render.js";
import { openModal } from "./modal.js";

let currentPokemonList = [];

export function setPokemonList(list) {
  currentPokemonList = list ?? [];
}

export function filterPokemon(searchText, selectedType) {
  searchText = searchText.toLowerCase();

  const filtered = currentPokemonList.filter((pokemon) => {
    const name = pokemon?.name?.toLowerCase() ?? "";
    const matchesName = name.includes(searchText);
    const pokemonTypes = pokemon?.types ?? [];
    const matchesType =
      selectedType === "" || pokemonTypes.includes(selectedType);
    return matchesName && matchesType;
  });

  renderPokemonList(filtered);
}

async function loadGenerationFast(gen) {
  const speciesList = await fetchGeneration(gen);

  const first20 = speciesList.slice(0, 20);
  const fastData = [];

  for (const p of first20) {
    const info = await fetchPokemon(p.url);
    if (info?.name) fastData.push(info);
  }

  renderPokemonList(fastData);

  const allData = [...fastData];
  const rest = speciesList.slice(20);

  for (const p of rest) {
    const info = await fetchPokemon(p.url);
    if (info?.name) allData.push(info);
  }

  setPokemonList(allData);
}

async function initialLoad() {
  await loadGenerationFast("1");
}

window.addEventListener("DOMContentLoaded", initialLoad);

document.getElementById("generationSelect").addEventListener("change", (e) => {
  loadGenerationFast(e.target.value);
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
