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
				<div class="pokemon-img card ${primaryType}-super-light ${primaryType}-super-light-shadow">
					<img class="pokemon-img-card" src="${sprite}">
				</div>
				<div class="pokemon-name">${pokemon.name}</div>
				<div class="pokemon-types">
					<div class="type-icon-small ${primaryType}">${typeIcon(primaryType)}</div>
					<div class="type-icon-small ${secondaryType}">${
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

function overlayHTML(pokemon) {
	const primaryType = pokemon.typing[0];
	const secondaryType = pokemon.typing[1] || "no-second-type";
	const typeIcon = (type) =>
		`<img src="./assets/icons/${type}.svg" alt="${type} type">`;
	return /*html*/ `
	<div id="pokemonDetails" class="pokemon-details ${primaryType}-light" onclick="event.stopPropagation()">
            <button class="close-button" onclick="closeOverlay(event)">X</button>
			<section class="overlay-top">
		<div class="pokemon-box">
			<div class="pokemon-img ${primaryType}-super-light">
				<img class="pokemon-img-overlay" src="${pokemon.sprite}" alt="${pokemon.name}">
			</div>
			<div class="pokemon-name">${pokemon.name}</div>
			<div class="pokemon-types">
					<div class="type-icon-big ${primaryType}">${typeIcon(primaryType)}</div>
					<div class="type-icon-big ${secondaryType}">${
		secondaryType !== "no-second-type" ? typeIcon(secondaryType) : ""
	}</div>
		</div>
	</section>
	<section class="overlay-bottom">
		<div class="pokemon-info">
			<div class="overlay-bottom__section">
				<div class="pokemon-info__flex-box gap">
					<div class="stat">HP</div>
					<div>${pokemon.hp}</div>
				</div>
				<div class="pokemon-info__flex-box gap">
					<div class="stat">Atk</div>
					<div>${pokemon.attack}</div>
				</div>
				<div class="pokemon-info__flex-box gap">
					<div class="stat">Def</div>
					<div>${pokemon.defense}</div>
				</div>
			</div>
			<div class="overlay-bottom__section">
				<div class="pokemon-info__flex-box gap">
					<div class="stat">Speed</div>
					<div>${pokemon.speed}</div>
				</div>
				<div class="pokemon-info__flex-box gap">
					<div class="stat">Sp.Atk</div>
					<div>${pokemon.special_attack}</div>
				</div>
				<div class="pokemon-info__flex-box gap">
					<div class="stat">Sp.Def</div>
					<div>${pokemon.special_defense}</div>
				</div>
			</div>
			<hr class="hr">
			<div class="overlay-bottom__base-stats">
				<div class="pokemon-info__flex-box gap">
					<div class="base-stats"><b>Base Stats</b></div><div><b>${calculateBaseStatsTotal(
						pokemon
					)}</b></div>
				</div>
			</div>
		</div>
	</section>
            <button class="nav-button left" onclick="navigatePokemon(-1)">◀</button>
            <button class="nav-button right" onclick="navigatePokemon(1)">▶</button>
        </div>`;
}
