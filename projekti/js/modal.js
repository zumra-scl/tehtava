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
    li.textContent = `${stat?.name ?? "Unknown"}: ${stat?.value ?? "N/A"}`;
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
