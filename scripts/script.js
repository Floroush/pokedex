let currentStartId = 31;

async function init() {
	let loadingScreen = document.getElementById("loadingScreen");
	loadingScreen.style.display = "flex";
	for (let i = 1; i <= 30; i++) {
		await loadData(i);
	}
	displayPokedex("Kanto");
	let kantoButton = document.getElementById("kantoButton");
	kantoButton.classList.add("active");
	let buttons = document.querySelectorAll(".pokedex-button");
	buttons.forEach((button) => {
		if (button !== kantoButton) {
			button.classList.remove("active");
		}
	});
	toggleLoadMoreButton("Kanto");
	setTimeout(() => {
		loadingScreen.style.display = "none";
	}, 500);
}

async function initPokedex(region) {
	let loadingScreen = document.getElementById("loadingScreen");
	loadingScreen.style.display = "flex";
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
	if (!regionData[region]) {
		console.error(`Region "${region}" nicht gefunden.`);
		return;
	}
	let [startId, endId] = regionData[region];
	completePokedex[region] = [];
	for (let i = startId; i < startId + 30 && i <= endId; i++) {
		await loadData(i);
	}
	displayPokedex(region);
	let regionButton = document.getElementById(region.toLowerCase() + "Button");
	regionButton.classList.add("active");
	let buttons = document.querySelectorAll(".pokedex-button");
	buttons.forEach((button) => {
		if (button !== regionButton) {
			button.classList.remove("active");
		}
	});
	toggleLoadMoreButton(region);
	setTimeout(() => {
		loadingScreen.style.display = "none";
	}, 500);
}

async function loadData(path = "") {
	console.log(`Loading data for Pokémon ID: ${path}`);
	let response = await fetch(BASE_URL + path);
	let data = await response.json();
	let firstType = data.types[0].type.name;
	let secondaryType = data.types[1] ? data.types[1].type.name : null;
	let sprite = data.sprites.other["home"].front_default;
	let regions = new Map([
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
		if (data.id >= start && data.id <= end) {
			console.log(`${region} push`);
			await pushPokedex(region, data, firstType, secondaryType, sprite);
			break;
		}
	}
}

function pushPokedex(region, data, firstType, secondaryType, sprite) {
	completePokedex[region].push({
		number: String(data.id).padStart(4, "0"),
		name: data.name.toUpperCase(),
		typing: [firstType, secondaryType],
		height: (data.height / 10).toFixed(2).replace(".", ",") + " m",
		weight: (data.weight / 10).toFixed(1).replace(".", ",") + " kg",
		sprite: sprite
	});
}

async function displayPokedex(region) {
	let pokemonContainer = document.getElementById("pokemonContainer");
	pokemonContainer.innerHTML = "";
	let buttonId = region.toLowerCase() + "Button";
	document.getElementById(buttonId).classList.add("active");
	let allRegionButtons = document.querySelectorAll(".pokedex-button");
	allRegionButtons.forEach((button) => {
		if (button.id !== buttonId) {
			button.classList.remove("active");
		}
	});
	let regionData = completePokedex[region];
	if (!regionData) return;
	for (let i = 0; i < regionData.length; i++) {
		let pokemon = regionData[i];
		let pokemonId = `${region}${i + 1}`;
		pokemonContainer.innerHTML += pokemonContainerHTML(pokemon, pokemonId, i);
	}
	toggleLoadMoreButton(region);
}

function toggleLoadMoreButton(region) {
	if (!region || !completePokedex[region]) {
		console.warn("toggleLoadMoreButton: Ungültige Region:", region);
		return;
	}
	let loadMoreButtonContainer = document.getElementById(
		"loadMoreButtonContainer"
	);
	let existingButton = document.getElementById("loadMoreButton");
	if (existingButton) {
		existingButton.remove();
	}
	loadMoreButtonContainer.innerHTML = loadMoreButtonHTML(region);
	let loadMoreButton = document.getElementById("loadMoreButton");
	let input = document.getElementById("searchBar").value;
	if (input.length >= 3) {
		loadMoreButton.style.display = "none";
		return;
	}
	if (completePokedex[region].length >= 151) {
		loadMoreButton.style.display = "none";
	} else if (completePokedex[region].length >= 30) {
		loadMoreButton.style.display = "block";
	} else {
		loadMoreButton.style.display = "none";
	}
	loadMoreButton.setAttribute("onclick", `loadMore('${region}')`);
}

async function loadMore(region) {
	let loadMoreButton = document.getElementById("loadMoreButton");
	let loadingScreen = document.getElementById("loadingScreen");
	loadingScreen.style.display = "flex";
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
	if (!regionData[region]) {
		console.error(`Region "${region}" nicht gefunden.`);
		return;
	}
	let [startId, endId] = regionData[region];
	let alreadyLoaded = completePokedex[region].length;
	let nextStartId = startId + alreadyLoaded;
	console.log(`Loading more Pokémon for ${region}: Start at ID ${nextStartId}`);
	for (let i = nextStartId; i < nextStartId + 30 && i <= endId; i++) {
		await loadData(i);
	}
	displayPokedex(region);
	toggleLoadMoreButton(region);
	setTimeout(() => {
		loadingScreen.style.display = "none";
	}, 500);
}

function searchPokemon() {
	let input = document.getElementById("searchBar").value.toLowerCase();
	let pokemonContainer = document.getElementById("pokemonContainer");
	let suggestionsList = document.getElementById("suggestions");
	if (input.length < 3) {
		displayPokedex("Kanto");
		toggleLoadMoreButton();
		clearSuggestions(suggestionsList);
		return;
	}
	let filteredPokemon = filterPokemon(input);
	displaySuggestions(filteredPokemon, suggestionsList);
	displayFilteredPokemon(filteredPokemon, pokemonContainer);
	document.getElementById("loadMoreButton").style.display = "none";
}

function filterPokemon(input) {
	return completePokedex["Kanto"].filter((pokemon) =>
		pokemon.name.toLowerCase().includes(input)
	);
}

function displaySuggestions(filteredPokemon, suggestionsList) {
	suggestionsList.innerHTML = "";
	if (filteredPokemon.length === 0) {
		suggestionsList.style.display = "none";
	} else {
		filteredPokemon.forEach((pokemon) => {
			let li = document.createElement("li");
			li.textContent = pokemon.name;
			li.onclick = function () {
				document.getElementById("searchBar").value = pokemon.name;
				searchPokemon();
				suggestionsList.style.display = "none";
			};
			suggestionsList.appendChild(li);
		});
		suggestionsList.style.display = "block";
	}
}

function displayFilteredPokemon(filteredPokemon, pokemonContainer) {
	pokemonContainer.innerHTML = ""; // Reset container
	if (filteredPokemon.length === 0) {
		pokemonContainer.innerHTML = `<p>Kein Pokémon gefunden.</p>`;
	} else {
		filteredPokemon.forEach((pokemon, i) => {
			let pokemonId = `Kanto${i + 1}`;
			pokemonContainer.innerHTML += pokemonContainerHTML(pokemon, pokemonId, i);
		});
	}
}

function clearSuggestions(suggestionsList) {
	suggestionsList.innerHTML = "";
	suggestionsList.style.display = "none";
}
