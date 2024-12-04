function pokemonContainerHtml(pokemon, pokemonId, i) {
	return /*html*/ `
    <div id="${pokemonId}" class="pokemon-container ${pokemon.typing[0]}">
            <section class="pokemon-container__header ${pokemon.typing[0]}">
                <div class="pokemon-number">${pokemon.number}</div>
                <div class="pokemon-box">
                    <div class="pokemon-img">
                        <img src="${pokemon.sprite}"">
                    </div>
                    <div class="pokemon-name">${pokemon.name}</div>
                    <div class="pokemon-types">
                        <div>
                            <div id="pokemonType" class="icon ${
															pokemon.typing[0]
														}">
                                <img src="./assets/icons/${
																	pokemon.typing[0]
																}.svg">
                            </div>
                        </div>
                        <div>
                            <div id="pokemonType" class="icon ${
															pokemon.typing[1]
																? pokemon.typing[1]
																: "no-second-type"
														}">
                                <img src="./assets/icons/${
																	pokemon.typing[1]
																}.svg">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="pokemon-info">
                <div class="pokemon-info__flex-box">
                    <div>Species:</div>
                    <div>?</div>
                </div>
                <div class="pokemon-info__flex-box">
                    <div>Height:</div>
                    <div>${pokemon.height}</div>
                </div>
                <div class="pokemon-info__flex-box">
                    <div>Weight:</div>
                    <div>${pokemon.weight}</div>
                </div>
                <div class="pokemon-info__flex-box">
                    <div>Abilities:</div>
                    <div>?</div>
                </div>
            </section>
        </div>`;
}
