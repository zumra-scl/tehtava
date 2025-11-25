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

    // Tyypit (ikonit)
    const typesEl = document.createElement("div");
    typesEl.classList.add("types");
    pokemon.types.forEach((type) => {
      const icon = document.createElement("img");
      icon.src = `./images/typeicons/${type}.svg`;
      icon.alt = type;
      typesEl.appendChild(icon);
    });

    const favBtn = document.createElement("button");
    favBtn.textContent = "Add to favorites";
    favBtn.classList.add("fav-btn");
    favBtn.onclick = () => {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (!favorites.find((p) => p.name === pokemon.name)) {
        favorites.push(pokemon);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(`${pokemon.name} added to favorites!`);
      } else {
        alert(`${pokemon.name} already in favorites!`);
      }
    };

    card.appendChild(imgEl);
    card.appendChild(nameEl);
    card.appendChild(typesEl);
    card.appendChild(favBtn);

    container.appendChild(card);
  });
}
window.addEventListener("DOMContentLoaded", () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  renderPokemonList(favorites);

  const clearBtn = document.getElementById("clearFavoritesBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Clear all?")) {
        localStorage.removeItem("favorites");
        renderPokemonList([]);
      }
    });
  }
});
