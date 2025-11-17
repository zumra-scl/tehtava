export function openModal(pokemon) {
  const modal = document.getElementById("pokemonModal");

  document.getElementById("modalName").textContent = pokemon.name;
  document.getElementById("modalImage").src = pokemon.image;

  document.getElementById("modalHeight").textContent = pokemon.height ?? "N/A";
  document.getElementById("modalWeight").textContent = pokemon.weight ?? "N/A";

  const abilitiesList = document.getElementById("modalAbilities");
  abilitiesList.innerHTML = "";
  pokemon.abilities?.forEach((a) => {
    const li = document.createElement("li");
    li.textContent = a;
    abilitiesList.appendChild(li);
  });

  const statsList = document.getElementById("modalStats");
  statsList.innerHTML = "";
  pokemon.stats?.forEach((statObj) => {
    const li = document.createElement("li");
    li.textContent = `${statObj.name}: ${statObj.base}`;
    statsList.appendChild(li);
  });

  modal.classList.remove("hidden");
}

export function closeModal() {
  document.getElementById("pokemonModal").classList.add("hidden");
}

document.getElementById("closeModalBtn").addEventListener("click", closeModal);
