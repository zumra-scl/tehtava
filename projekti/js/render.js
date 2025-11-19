import { openModal } from "./modal.js";

export function renderPokemonList(pokemonArray) {
  const container = document.getElementById("pokemon-list");
  container.innerHTML = "";

  pokemonArray.forEach((pokemon) => {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    // Nimi
    const nameEl = document.createElement("h3");
    nameEl.textContent = pokemon.name;
    nameEl.onclick = () => openModal(pokemon);

    // Kuva
    const imgEl = document.createElement("img");
    imgEl.src = pokemon.image;
    imgEl.alt = pokemon.name;
    imgEl.onclick = () => openModal(pokemon);

    // Tyypit
    const typesEl = document.createElement("div");
    typesEl.classList.add("types");

    pokemon.types.forEach((type) => {
      const icon = document.createElement("img");
      icon.src = `images/types/${type}.png`;
      icon.alt = type;
      typesEl.appendChild(icon);
    });

    card.appendChild(imgEl);
    card.appendChild(nameEl);
    card.appendChild(typesEl);

    container.appendChild(card);
  });
}
