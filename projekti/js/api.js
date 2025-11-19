// Hakee yhden sukupolven Pokémonit
export async function fetchGeneration(gen) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/generation/${gen}`);
    const data = await response.json();
    return data.pokemon_species.map((p) => ({
      name: p.name,
      url: p.url,
    }));
  } catch (error) {
    console.error("Error fetching generation:", error);
    return [];
  }
}

// Hakee yhden Pokémonin tiedot
export async function fetchPokemon(url) {
  try {
    const pokemonUrl = url.replace("-species", "");

    const response = await fetch(pokemonUrl);
    const data = await response.json();

    return {
      name: data.name,
      image:
        data.sprites.other["official-artwork"].front_default ||
        "images/placeholder.png",
      types: data.types.map((t) => t.type.name),
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.map((a) => a.ability.name),
      stats: data.stats.map((s) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
    };
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return null;
  }
}
