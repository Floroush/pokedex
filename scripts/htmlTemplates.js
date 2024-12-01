function pokemonContainerHtml(pokemon, pokemonId, i) {
	return /*html*/ `
    <div id="${pokemonId}" class="pokemon-container ${
		pokemon.typing[0] + "-light-shadow"
	}">
        <div class="pokemon-header">
            <div class="pokemon-name">${pokemon.name}</div>
            <div class="pokemon-types">
                <div id="pokemonType1" class="icon-small ${pokemon.typing[0]}">
                    <img src="./assets/icons/${pokemon.typing[0]}.svg">
                </div>
                <div id="pokemonType2" class="icon-small ${pokemon.typing[1]}">
                    <img src="./assets/icons/${pokemon.typing[1]}.svg">
                </div>
            </div>
            <div class="pokemon-number">${pokemon.number}</div>
        </div>
        <div class="pokemon-img ${pokemon.typing[0]} ${
		pokemon.typing[0] + "-shadow"
	}">
            <img src="${pokemon.sprite}">
        </div>
        <div class="pokemon-info">

            <div class="pokemon-type">
        ${pokemon.typing[0]} ${pokemon.typing[1] ? pokemon.typing[1] : ""}
            </div>
            <div id="pokemonType" class="icon ${pokemon.typing[0]}">
                <img src="./assets/icons/${pokemon.typing[0]}.svg">
            </div>
            <div id="pokemonType" class="icon ${pokemon.typing[1]}">
                <img src="./assets/icons/${pokemon.typing[1]}.svg">
            </div>
            <div>Height: ${pokemon.height}</div>
            <div>Weight: ${pokemon.weight}</div>
        </div>
    </div>`;
}
