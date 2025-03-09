async function initPokedex(region) {
	let loadingScreen = document.getElementById("loadingScreen");
	showLoadingScreen(loadingScreen);
	loadRegionDataFromLocalStorage(region);
	if (isRegionDataLoaded(region)) {
		displayPokedex(region);
		toggleLoadMoreButton(region);
		return hideLoadingScreen(loadingScreen);
	}
	let regionData = loadRegionData(region);
	if (!regionData) return hideLoadingScreen(loadingScreen);
	toggleRegionButton(region.toLowerCase() + "Button");
	await loadPokemonDataForRegion(region, regionData.startId, regionData.endId);
	saveRegionDataToLocalStorage(region);
	displayPokedex(region);
	toggleLoadMoreButton(region);
	hideLoadingScreen(loadingScreen);
}

function showLoadingScreen(loadingScreen) {
	loadingScreen.style.display = "flex";
}

function hideLoadingScreen(loadingScreen) {
	setTimeout(() => {
		loadingScreen.style.display = "none";
	}, 500);
}

function toggleRegionButton(activeButtonId) {
	const regionButton = document.getElementById(activeButtonId);
	regionButton.classList.add("active");
	const buttons = document.querySelectorAll(".pokedex-button");
	buttons.forEach((button) => {
		if (button !== regionButton) {
			button.classList.remove("active");
		}
	});
}

function isRegionDataLoaded(region) {
	return completePokedex[region] && completePokedex[region].length > 0;
}

function loadRegionData(region) {
	let regionData = getRegionData(region);
	if (!regionData) return null;
	let [startId, endId] = regionData;
	return { startId, endId };
}

async function loadPokemonDataForRegion(region, startId, endId) {
	completePokedex[region] = [];
	for (let i = startId; i < startId + 30 && i <= endId; i++) {
		await loadApiData(i);
	}
	console.log(`Loaded ${completePokedex[region].length} Pokémon for ${region}`);
}

async function loadPokemonData(region) {
	for (let i = 1; i <= 30; i++) {
		await loadApiData(region, i);
	}
}

async function loadApiData(path = "") {
	console.log(`Loading data for Pokémon ID: ${path}`);
	let response = await fetch(BASE_URL + path);
	let data = await response.json();
	let { firstType, secondaryType } = extractTypes(data);
	let sprite = extractSprite(data);
	let firstAbility = extractAbility(data);
	let region = getRegionForPokemon(data.id);
	let stats = extractStats(data);
	if (region) {
		console.log(`Pushing ${region} Pokémon`);
		await pushPokemon(
			region,
			data,
			firstType,
			secondaryType,
			sprite,
			firstAbility,
			stats
		);
	}
}

function extractTypes(data) {
	let firstType = data.types[0].type.name;
	let secondaryType = data.types[1] ? data.types[1].type.name : null;
	return { firstType, secondaryType };
}

function extractSprite(data) {
	return data.sprites.other["home"].front_default;
}

function extractAbility(data) {
	return data.abilities[0].ability.name;
}

function extractStats(data) {
	return {
		hp: data.stats[0].base_stat,
		attack: data.stats[1].base_stat,
		defense: data.stats[2].base_stat,
		special_attack: data.stats[3].base_stat,
		special_defense: data.stats[4].base_stat,
		speed: data.stats[5].base_stat
	};
}

function calculateBaseStatsTotal(pokemon) {
	return (
		pokemon.hp +
		pokemon.attack +
		pokemon.defense +
		pokemon.special_attack +
		pokemon.special_defense +
		pokemon.speed
	);
}

function getRegionForPokemon(id) {
	const regions = new Map([
		["Kanto", [1, 151]],
		["Johto", [152, 251]],
		["Hoenn", [252, 386]],
		["Sinnoh", [387, 493]],
		["Unova", [494, 649]],
		["Kalos", [650, 721]],
		["Alola", [722, 809]],
		["Galar", [810, 905]],
		["Paldea", [906, 1025]]
	]);
	for (let [region, [start, end]] of regions) {
		if (id >= start && id <= end) return region;
	}
	return null;
}

function pushPokemon(
	region,
	data,
	firstType,
	secondaryType,
	sprite,
	firstAbility,
	stats
) {
	return new Promise((resolve) => {
		completePokedex[region].push({
			number: String(data.id).padStart(4, "0"),
			name: data.name.toUpperCase(),
			typing: [firstType, secondaryType],
			height: (data.height / 10).toFixed(2).replace(".", ",") + " m",
			weight: (data.weight / 10).toFixed(1).replace(".", ",") + " kg",
			sprite: sprite,
			ability: firstAbility,
			...stats
		});
		resolve();
	});
}

function saveRegionDataToLocalStorage(region) {
	const regionData = completePokedex[region];
	if (regionData.length > 0) {
		localStorage.setItem(region, JSON.stringify(regionData));
	}
}

function loadRegionDataFromLocalStorage(region) {
	const storedData = localStorage.getItem(region);
	if (storedData) {
		completePokedex[region] = JSON.parse(storedData);
	}
}

function displayPokedex(region) {
	toggleRegionButton(region.toLowerCase() + "Button");
	loadRegionDataToContainer(region);
	toggleLoadMoreButton(region);
}

function loadRegionDataToContainer(region) {
	let regionData = completePokedex[region];
	if (!regionData) return;
	let pokemonContainer = clearPokemonContainer();
	regionData.forEach((pokemon, i) => {
		let pokemonId = `${region}${i + 1}`;
		addPokemonToContainer(pokemonContainer, pokemon, pokemonId, i, region);
	});
}

function clearPokemonContainer() {
	let pokemonContainer = document.getElementById("pokemonContainer");
	pokemonContainer.innerHTML = "";
	return pokemonContainer;
}

function addPokemonToContainer(
	pokemonContainer,
	pokemon,
	pokemonId,
	index,
	region
) {
	const pokemonCardHTML = pokemonContainerHTML(pokemon, pokemonId, index);
	pokemonContainer.innerHTML += `
        <div class="pokemon-card" onclick="openOverlay(${index}, '${region}')">
            ${pokemonCardHTML}
        </div>
    `;
}

function toggleLoadMoreButton(region) {
	removeLoadMoreButton();
	createLoadMoreButton(region);
	updateLoadMoreButton(region);
}

function removeLoadMoreButton() {
	let existingButton = document.getElementById("loadMoreButton");
	if (existingButton) existingButton.remove();
}

function createLoadMoreButton(region) {
	let loadMoreButtonContainer = document.getElementById(
		"loadMoreButtonContainer"
	);
	loadMoreButtonContainer.innerHTML = loadMoreButtonHTML(region);
	document
		.getElementById("loadMoreButton")
		.setAttribute("onclick", `loadMorePokemon('${region}')`);
}

function updateLoadMoreButton(region) {
	let loadMoreButton = document.getElementById("loadMoreButton");
	let input = document.getElementById("searchBar").value;
	let pokemonCount = completePokedex[region].length;
	if (input.length >= 3 || pokemonCount >= 151) {
		loadMoreButton.style.display = "none";
	} else {
		loadMoreButton.style.display = pokemonCount >= 30 ? "block" : "none";
	}
}

async function loadMorePokemon(region) {
	let loadingScreen = document.getElementById("loadingScreen");
	showLoadingScreen(loadingScreen);
	let regionData = getRegionData(region);
	if (!regionData) return;
	let nextStartId = getStartId(region, regionData);
	console.log(`Loading more Pokémon for ${region}: Start at ID ${nextStartId}`);
	await loadMoreData(region, nextStartId, regionData[1]);
	saveRegionDataToLocalStorage(region);
	displayPokedex(region);
	toggleLoadMoreButton(region);
	hideLoadingScreen(loadingScreen);
}

function getRegionData(region) {
	let regionData = {
		"Kanto": [1, 151],
		"Johto": [152, 251],
		"Hoenn": [252, 386],
		"Sinnoh": [387, 493],
		"Unova": [494, 649],
		"Kalos": [650, 721],
		"Alola": [722, 809],
		"Galar": [810, 905],
		"Paldea": [906, 1025]
	};
	return regionData[region];
}

function getStartId(region, regionData) {
	let alreadyLoaded = completePokedex[region].length;
	return regionData[0] + alreadyLoaded;
}

async function loadMoreData(region, startId, endId) {
	for (let i = startId; i < startId + 30 && i <= endId; i++) {
		await loadApiData(i);
	}
}

function searchPokemon() {
	let input = document.getElementById("searchBar").value.toLowerCase();
	let pokemonContainer = document.getElementById("pokemonContainer");
	let suggestionsList = document.getElementById("suggestions");
	let clearButton = document.getElementById("clearButton");
	toggleClearButtonVisibility(input, clearButton);
	if (input.length < 3) {
		handleInput(currentRegion, suggestionsList);
		return;
	}
	filterAndDisplayPokemon(input, suggestionsList, pokemonContainer);
}

function toggleClearButtonVisibility(input, clearButton) {
	if (clearButton) {
		clearButton.style.display = input.length > 0 ? "block" : "none";
	}
}

function deactivateRegionButtons() {
	let regionButtons = document.querySelectorAll(".pokedex-button.active");
	regionButtons.forEach((button) => button.classList.remove("active"));
}

function handleInput(currentRegion, suggestionsList) {
	deactivateRegionButtons();
	displayPokedex(currentRegion);
	toggleLoadMoreButton(currentRegion);
	addSearchBarListener();
}

function addSearchBarListener() {
	let searchBar = document.getElementById("searchBar");
	searchBar.addEventListener("input", searchPokemon);
}

function filterAndDisplayPokemon(input, suggestionsList, pokemonContainer) {
	deactivateRegionButtons();
	let filteredPokemon = filterPokemonAcrossRegions(input);
	displayFilteredPokemon(filteredPokemon, pokemonContainer);
	toggleLoadMoreButton(currentRegion);
}

function filterPokemonAcrossRegions(input) {
	let filteredPokemon = [];
	for (let region in completePokedex) {
		let regionPokemon = completePokedex[region].filter((pokemon) =>
			pokemon.name.toLowerCase().includes(input)
		);
		filteredPokemon = filteredPokemon.concat(regionPokemon);
	}
	return filteredPokemon;
}

function displayFilteredPokemon(filteredPokemon, pokemonContainer) {
	pokemonContainer.innerHTML = "";
	if (filteredPokemon.length === 0) {
		pokemonContainer.innerHTML = `<p>No Pokémon found. :(</p>`;
	} else {
		filteredPokemon.forEach((pokemon, i) => {
			let pokemonId = `${pokemon.region}${i + 1}`;
			pokemonContainer.innerHTML += `
				<div class="pokemon-card" onclick="openOverlay(${i}, '${pokemon.region}')">
					${pokemonContainerHTML(pokemon, pokemonId, i)}
				</div>
			`;
		});
	}
}

function addPokemonToContainer(
	pokemonContainer,
	pokemon,
	pokemonId,
	index,
	region
) {
	const pokemonCardHTML = pokemonContainerHTML(pokemon, pokemonId, index);
	pokemonContainer.innerHTML += `
        <div class="pokemon-card" onclick="openOverlay(${index}, '${region}')">
            ${pokemonCardHTML}
        </div>
    `;
}

function clearSuggestions(suggestionsList) {
	suggestionsList.innerHTML = "";
	suggestionsList.style.display = "none";
}

function clearSearch() {
	let searchBar = document.getElementById("searchBar");
	searchBar.value = "";
	searchPokemon();
	document.getElementById("clearButton").style.display = "none";
}

let currentPokemonIndex = 0;
let currentRegion = "Kanto";

function openOverlay(index, region) {
	currentPokemonIndex = index;
	currentRegion = region;
	updateOverlay();
	document.getElementById("overlay").style.display = "flex";
	document.body.style.overflow = "hidden";
}

function closeOverlay(event) {
	document.getElementById("overlay").style.display = "none";
	document.body.style.overflow = "auto";
}

function navigatePokemon(direction) {
	let regionData = completePokedex[currentRegion];
	currentPokemonIndex =
		(currentPokemonIndex + direction + regionData.length) % regionData.length;
	updateOverlay();
}

function updateOverlay() {
	let regionData = completePokedex[currentRegion];
	let pokemon = regionData[currentPokemonIndex];
	document.getElementById("overlayContent").innerHTML = overlayHTML(pokemon);
}
