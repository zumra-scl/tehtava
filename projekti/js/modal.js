export function openModal(pokemon) {
  const modal = document.getElementById("pokemonModal");

  document.getElementById("modalName").textContent =
    pokemon?.name ?? "Unknown Pokémon";
  document.getElementById("modalImage").src =
    pokemon?.image ?? "assets/placeholder.png";

  document.getElementById("modalHeight").textContent = pokemon?.height ?? "N/A";
  document.getElementById("modalWeight").textContent = pokemon?.weight ?? "N/A";

  const abilitiesList = document.getElementById("modalAbilities");
  abilitiesList.innerHTML = "";
  (pokemon?.abilities ?? []).forEach((ability) => {
    const li = document.createElement("li");
    li.textContent = ability ?? "N/A";
    abilitiesList.appendChild(li);
  });

  const statsList = document.getElementById("modalStats");
  statsList.innerHTML = "";
  (pokemon?.stats ?? []).forEach((stat) => {
    const li = document.createElement("li");
    li.textContent = `${stat?.name ?? "Unknown"}: ${stat?.base ?? "N/A"}`;
    statsList.appendChild(li);
  });

  modal.classList.remove("hidden");
}

export function closeModal() {
  document.getElementById("pokemonModal").classList.add("hidden");
}

document.getElementById("closeModalBtn")?.addEventListener("click", closeModal);

document.getElementById("pokemonModal")?.addEventListener("click", (e) => {
  if (e.target.id === "pokemonModal") closeModal();
});
import { filterPokemon } from "./api.js";
document.getElementById("searchBtn").addEventListener("click", () => {
  const searchValue = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const selectedType = document.getElementById("typeFilter").value;
  filterPokemon(searchValue, selectedType);
});

document.getElementById("searchInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const searchValue = event.target.value.trim().toLowerCase();
    const selectedType = document.getElementById("typeFilter").value;
    filterPokemon(searchValue, selectedType);
  }
});

document.getElementById("typeFilter").addEventListener("change", () => {
  const searchValue = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const selectedType = document.getElementById("typeFilter").value;
  filterPokemon(searchValue, selectedType);
});

document
  .getElementById("generationSelect")
  .addEventListener("change", (event) => {
    const selectedGen = event.target.value;
    loadGeneration(selectedGen);

    document.getElementById("searchInput").value = "";
    document.getElementById("typeFilter").value = "";
  });
