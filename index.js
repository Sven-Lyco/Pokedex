console.clear();

const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => createPokemonList(data.results))
  .catch(error => console.log(error));

function createPokemonList(allPokemons) {
  allPokemons.forEach(pokemonType => {
    const pokemonURL = pokemonType.url;
    fetch(pokemonURL)
      .then(response => response.json())
      .then(pokeData => renderPokemonList(pokeData))
      .catch(error => console.log(error));
  });
}

function renderPokemonList(pokemons) {
  const item = document.createElement('div');

  item.className = 'pokemon-card';
  item.innerHTML = `
    <h2 class="pokemon-card__name">${pokemons.name}</h2>       
    <div class="pokemon-card_info">
      <span class="pokemon-card__ID">ID: ${pokemons.id}</span>
      <span class="pokemon-card__base-stat">${pokemons.stats[0].base_stat} HP</span>
      <span class="pokemon-card__type">${pokemons.types[0].type.name}</span> 
    </div>
    <img class="pokemon-card__image" src="${pokemons.sprites.other.dream_world.front_default}">   
    <ul class="pokemon-card__tag-list">
      <li>main ability: ${pokemons.abilities[0].ability.name}</li>          
      <li>weight: ${pokemons.weight} lbs.</li>          
      <li>height: ${pokemons.height}"</li>          
    </ul>              
  `;
  const unorderedList = document.querySelector('[data-js="ul-list"]');
  unorderedList.appendChild(item);
}
