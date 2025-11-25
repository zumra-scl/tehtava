import { renderPokemonList } from "./render.js";

window.addEventListener("DOMContentLoaded", () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  renderPokemonList(favorites);

  const clearBtn = document.getElementById("clearFavoritesBtn");
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("favorites");
    renderPokemonList([]);
  });
});
