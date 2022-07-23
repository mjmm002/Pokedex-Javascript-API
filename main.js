let pokemons = [];
const poke_container = document.getElementById("poke_container");
const url ="https://pokeapi.co/api/v2/pokemon";
const pokemons_number = 897;
const search = document.getElementById("search");
const form = document.getElementById("form");

// colors bg
const colors = {
  fire: '#fab9b9',
  water: '#bce4f7',
  grass: '#bef7c2',
  electric: '#fff4bd',
  ground: '#ffe3c7',
  rock: '#b0b0ac',
  fairy: '#f2c5fa',
  poison: '#a666bd',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#faccda',
  flying: '#f5f5f5',
  fighting: '#e6e0d4',
  normal: '#f5f5f5',
  dark: '#aaaaaa',
  steel: '#9d9c9c',
  ghost: '#ceccfa',
  ice: '#cbfffe'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getAllPokemon(i);
  }
  pokemons.forEach((pokemon) => createPokemonCard(pokemon));
};

const removePokemon = () => {
  const pokemonEls = document.getElementsByClassName("pokemon");
  let removablePokemons = [];
  for (let i = 0; i < pokemonEls.length; i++) {
    const pokemonEl = pokemonEls[i];
    removablePokemons = [...removablePokemons, pokemonEl];
  }
  removablePokemons.forEach((remPoke)=> remPoke.remove());
};

const getPokemon = async (id) => {
  const searchPokemons = pokemons.filter((poke) => poke.name === id);
  removePokemon();
  searchPokemons.forEach((pokemon) => createPokemonCard(pokemon));
};

const getAllPokemon = async (id) => {
  const res =await fetch(`${url}/${id}`);
  const pokemon = await res.json();
  pokemons = [...pokemons,pokemon];
};
fetchPokemons();

function createPokemonCard(pokemon) {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  const poke_types = pokemon.types.map((el) => el.type.name).slice(0, 1);
  const type = mainTypes.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];
  pokemonEl.style.backgroundColor = color;
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const poke_stat = pokemon.stats.map((el) => el.stat.name);
  const stats = poke_stat.slice(0, 3);
  const base_value = pokemon.stats.map((el) => el.base_stat);
  const base_stat = base_value.slice(0, 3);
  const stat = stats.map((stat) => {
    return `<li class="names">${stat}</li>`;
  }).join("");
  const base = base_stat.map((base) => {
    return `<li class="base">${base}</li>`
  }).join("");
  const pokeInnerHTML = `<div class="img-container">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${name}"/>
  </div>
  <div class="info">
  <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
  <h3 = class="name">${name}</h3>
  <small class="type"><span>${poke_types}</span></small>
  </div>
  <div class="stats">
  <h2>Stats</h2>
  <div class="flex">
  <ul>${stat}</ul>
  <ul>${base}</ul>
  </div>
  </div>`;
  pokemonEl.innerHTML = pokeInnerHTML;
  poke_container.appendChild(pokemonEl);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getPokemon(searchTerm);
    search.value = "";
  } else if (searchTerm === "") {
    pokemons = [];
    removePokemon();
    fetchPokemons();
  }
});