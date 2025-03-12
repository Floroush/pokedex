function pokemonContainerHTML(pokemon, pokemonId, i) {
	const primaryType = pokemon.typing[0];
	const secondaryType = pokemon.typing[1] || "no-second-type";
	const sprite = pokemon.sprite;
	const text = `class="pokemon-container__text"`;
	const categories = `class="pokemon-info__categories"`;
	const typeIcon = (type) =>
		`<img src="./assets/icons/${type}.svg" alt="${type} type">`;
	const renderInfo = (key, value, extraClass = "") => `
		<div class="pokemon-info__flex-box">
			<div ${categories}>${key}:</div>
			<div ${text} class="${extraClass}">${value}</div>
		</div>`;

	return /*html*/ `
	<div id="${pokemonId}" class="pokemon-container ${primaryType}-light">
		${pokemonContainerHeaderHTML(
			pokemon,
			primaryType,
			secondaryType,
			sprite,
			typeIcon
		)}
		${pokemonContainerFooterHTML(pokemon, primaryType, secondaryType, renderInfo)}
	</div>`;
}

function pokemonContainerHeaderHTML(
	pokemon,
	primaryType,
	secondaryType,
	sprite,
	typeIcon
) {
	return /*html*/ `<section class="pokemon-container__header ${primaryType}-light">
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
	</section>`;
}

function pokemonContainerFooterHTML(
	pokemon,
	primaryType,
	secondaryType,
	renderInfo
) {
	return /*html*/ `<section class="pokemon-info">
		${renderInfo(
			"Typing",
			`${primaryType} ${
				secondaryType !== "no-second-type" ? secondaryType : ""
			}`,
			secondaryType === "no-second-type" ? "no-second-type" : ""
		)}
		${renderInfo("Height", pokemon.height)}
		${renderInfo("Weight", pokemon.weight)}
		${renderInfo("Ability", pokemon.ability)}
	</section>`;
}

function loadMoreButtonHTML(region) {
	return /*html*/ `<button id="loadMoreButton" class="load-more-button" onclick="loadMore('${region}')">Load More Pokémon</button>`;
}

function pokemonCardHTML(pokemonCardHTML, index, region) {
	return `<div class="pokemon-card" onclick="openOverlay(${index}, '${region}')">
            ${pokemonCardHTML}
        </div>
    `;
}

function overlayHTML(pokemon) {
	const primaryType = pokemon.typing[0];
	const secondaryType = pokemon.typing[1] || "no-second-type";
	const text = `class="overlay__text"`;
	const typeIcon = (type) =>
		`<img src="./assets/icons/${type}.svg" alt="${type} type">`;
	const renderStat = (key, value) => `<div class="pokemon-info__flex-box gap">
		<div class="stat overlay__text">${key}</div>
		<div ${text}>${value}</div>
	</div>`;
	return /*html*/ `
	<div id="pokemonDetails" class="pokemon-details ${primaryType}-light" onclick="event.stopPropagation()">
		${overlayCloseButtonHTML()}
		${overlayTopHTML(pokemon, primaryType, secondaryType, typeIcon)}
		${overlayBottomHTML(pokemon, renderStat)}
		${overlayNavButtonsHTML()}
	</div>
	`;
}

function overlayCloseButtonHTML() {
	return /*html*/ `<button class="close-button" onclick="closeOverlay(event)">X</button>`;
}

function overlayTopHTML(pokemon, primaryType, secondaryType, typeIcon) {
	return /*html*/ `<section class="overlay-top">
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
		</div>
	</section>`;
}

function overlayBottomHTML(pokemon, renderStat) {
	return /*html*/ `<section class="overlay-bottom">
		<div class="pokemon-info">
			<div class="overlay-bottom__section">
				${renderStat("HP", pokemon.hp)}
				${renderStat("Atk", pokemon.attack)}
				${renderStat("Def", pokemon.defense)}
			</div>
			<div class="overlay-bottom__section">
				${renderStat("Speed", pokemon.speed)}
				${renderStat("Sp.Atk", pokemon.special_attack)}
				${renderStat("Sp.Def", pokemon.special_defense)}
			</div>
			<hr class="hr">
			<div class="overlay-bottom__base-stats">
				<div class="pokemon-info__flex-box gap">
					<div class="base-stats"><b class="overlay__text">Base Stats</b></div>
					<div><b class="overlay__text">${calculateBaseStatsTotal(pokemon)}</b></div>
				</div>
			</div>
		</div>
	</section>`;
}

function overlayNavButtonsHTML() {
	return /*html*/ `<button class="nav-button left" onclick="navigatePokemon(-1)">◀</button>
	<button class="nav-button right" onclick="navigatePokemon(1)">▶</button>`;
}
