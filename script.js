document.addEventListener("DOMContentLoaded", function () {

    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

    function getElement(element) {
        return document.querySelector(element);
    }

    const searchInput = getElement('.search-input');
    const searchButton = getElement('.search-button');
    const container = getElement('.container');
    const errorMessage = getElement('.error-message');

    var searchString;
    var pokemon;
    var card;

    async function requestPokeInfo(url, name) {
        try {
            const response = await fetch(url + name);
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            pokemon = await response.json();
        } catch (err) {
            alert(err);
            pokemon = null; // Resetar pokemon em caso de erro
        }
    }

    searchButton.addEventListener("click", async event => {
        event.preventDefault();
        searchString = searchInput.value.toLowerCase();
        await startApp(searchString);
    });

    function createCard() {
        card = `
<div class="pokemon-picture">
<img src="${pokemon.sprites.front_default}" alt="Imagem do Pokémon">
</div>
<div class="pokemon-info">
<h1 class="name">${pokemon.name.toUpperCase()}</h1>
<h2 class="number">Número: ${pokemon.id}</h2>
<h3 class="weight">Peso: ${pokemon.weight / 10} kg</h3>
<h3 class="height">Altura: ${pokemon.height / 10} m</h3>
</div>
`;
        return card;
    }

    async function startApp(searchString) {
        await requestPokeInfo(baseUrl, searchString);

        if (!pokemon) {
            errorMessage.style.display = 'block';
            container.style.display = 'none';
        } else {
            errorMessage.style.display = "none";
            container.style.display = "flex";
            container.innerHTML = createCard();
        }
    }

});

