function pokemonContainerHTML(pokemon, pokemonId, i) {
	return /*html*/ `
    <div id="${pokemonId}" class="pokemon-container ${
		pokemon.typing[0] + "-light"
	}">
            <section class="pokemon-container__header ${
							pokemon.typing[0] + "-light"
						}">
                <div class="pokemon-number">${pokemon.number}</div>
                <div class="pokemon-box">
                    <div class="pokemon-img ${
											pokemon.typing[0] + "-super-light"
										} ${pokemon.typing[0] + "-super-light-shadow"}">
                        <img src="${pokemon.sprite}"">
                    </div>
                    <div class="pokemon-name">${pokemon.name}</div>
                    <div class="pokemon-types">
                        <div>
                            <div id="pokemonType" class="type-icon ${
															pokemon.typing[0]
														}">
                                <img src="./assets/icons/${
																	pokemon.typing[0]
																}.svg">
                            </div>
                        </div>
                        <div>
                            <div id="pokemonType" class="type-icon ${
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
                    <div>Typing:</div>
                    <div class="types">
                        <div>${pokemon.typing[0]}</div>
                        <div ${
													pokemon.typing[1]
														? pokemon.typing[1]
														: "class=no-second-type"
												}">${pokemon.typing[1] ? pokemon.typing[1] : ""}
                        </div>
                    </div>
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

function loadMoreButtonHTML(region) {
	return /*html*/ `<button id="loadMoreButton" class="load-more-button" style="display: none;" onclick="loadMore('${region}')">Load More Pokémon</button>`;
}
