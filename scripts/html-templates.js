function pokemonContainerHTML(pokemon, pokemonId, i) {
	const primaryType = pokemon.typing[0];
	const secondaryType = pokemon.typing[1] || "no-second-type";
	const sprite = pokemon.sprite;
	const text = `class="pokemon-container__text"`;
	const categories = `class="pokemon-info__categories"`;
	const typeIcon = (type) =>
		`<img src="./assets/icons/${type}.svg" alt="${type} type">`;
	return /*html*/ `
	<div id="${pokemonId}" class="pokemon-container ${primaryType}-light">
		<section class="pokemon-container__header ${primaryType}-light">
			<div class="pokemon-number pokemon-container__text">${pokemon.number}</div>
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
			<div class="pokemon-info__flex-box"><div ${categories}>Typing:</div><div class="types"><div ${text}>${primaryType}</div><div ${text} class="${
		secondaryType === "no-second-type" ? "no-second-type" : ""
	}">${
		secondaryType !== "no-second-type" ? secondaryType : ""
	}</div></div></div>
			<div class="pokemon-info__flex-box"><div ${categories}>Height:</div><div ${text}>${
		pokemon.height
	}</div></div>
			<div class="pokemon-info__flex-box"><div ${categories}>Weight:</div><div ${text}>${
		pokemon.weight
	}</div></div>
			<div class="pokemon-info__flex-box"><div ${categories}>Ability:</div><div ${text}>${
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
	const text = `class="overlay__text"`;
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
					<div class="stat overlay__text">HP</div>
					<div ${text}>${pokemon.hp}</div>
				</div>
				<div class="pokemon-info__flex-box gap">
					<div class="stat overlay__text">Atk</div>
					<div ${text}>${pokemon.attack}</div>
				</div>
				<div class="pokemon-info__flex-box gap">
					<div class="stat overlay__text">Def</div>
					<div ${text}>${pokemon.defense}</div>
				</div>
			</div>
			<div class="overlay-bottom__section">
				<div class="pokemon-info__flex-box gap">
					<div class="stat overlay__text">Speed</div>
					<div ${text}>${pokemon.speed}</div>
				</div>
				<div class="pokemon-info__flex-box gap">
					<div class="stat overlay__text">Sp.Atk</div>
					<div ${text}>${pokemon.special_attack}</div>
				</div>
				<div class="pokemon-info__flex-box gap">
					<div class="stat overlay__text">Sp.Def</div>
					<div ${text}>${pokemon.special_defense}</div>
				</div>
			</div>
			<hr class="hr">
			<div class="overlay-bottom__base-stats">
				<div class="pokemon-info__flex-box gap">
					<div class="base-stats"><b class="overlay__text">Base Stats</b></div><div><b ${text}>${calculateBaseStatsTotal(
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
