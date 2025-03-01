function pokemonContainerHTML(pokemon, pokemonId, i) {
	const primaryType = pokemon.typing[0];
	const secondaryType = pokemon.typing[1] || "no-second-type";
	const sprite = pokemon.sprite;
	const typeIcon = (type) =>
		`<img src="./assets/icons/${type}.svg" alt="${type} type">`;
	return /*html*/ `
	<div id="${pokemonId}" class="pokemon-container ${primaryType}-light">
		<section class="pokemon-container__header ${primaryType}-light">
			<div class="pokemon-number">${pokemon.number}</div>
			<div class="pokemon-box">
				<div class="pokemon-img ${primaryType}-super-light ${primaryType}-super-light-shadow">
					<img src="${sprite}">
				</div>
				<div class="pokemon-name">${pokemon.name}</div>
				<div class="pokemon-types">
					<div class="type-icon ${primaryType}">${typeIcon(primaryType)}</div>
					<div class="type-icon ${secondaryType}">${
		secondaryType !== "no-second-type" ? typeIcon(secondaryType) : ""
	}</div>
				</div>
			</div>
		</section>
		<section class="pokemon-info">
			<div class="pokemon-info__flex-box"><div>Typing:</div><div class="types"><div>${primaryType}</div><div class="${
		secondaryType === "no-second-type" ? "no-second-type" : ""
	}">${
		secondaryType !== "no-second-type" ? secondaryType : ""
	}</div></div></div>
			<div class="pokemon-info__flex-box"><div>Height:</div><div>${
				pokemon.height
			}</div></div>
			<div class="pokemon-info__flex-box"><div>Weight:</div><div>${
				pokemon.weight
			}</div></div>
			<div class="pokemon-info__flex-box"><div>Ability:</div><div>${
				pokemon.ability
			}</div></div>
		</section>
	</div>`;
}

function loadMoreButtonHTML(region) {
	return /*html*/ `<button id="loadMoreButton" class="load-more-button" style="display: none;" onclick="loadMore('${region}')">Load More Pokémon</button>`;
}
