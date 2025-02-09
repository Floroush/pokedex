// async function init() {
// 	for (let i = 1; i < 1026; i++) {
// 		// always Pokédex No.++
// 		await loadData(i);
// 	}
// 	console.log("Kanto Pokémon:", completePokedex.Kanto);
// 	console.log("Johto Pokémon:", completePokedex.Johto);
// 	console.log("Hoenn Pokémon:", completePokedex.Hoenn);
// 	console.log("Sinnoh Pokémon:", completePokedex.Sinnoh);
// 	console.log("Unova Pokémon:", completePokedex.Unova);
// 	console.log("Kalos Pokémon:", completePokedex.Kalos);
// 	console.log("Alola Pokémon:", completePokedex.Alola);
// 	console.log("Galar Pokémon:", completePokedex.Galar);
// 	console.log("Paldea Pokémon:", completePokedex.Paldea);
// }

let currentStartId = 31; // Start-ID für die nächsten Pokémon

async function init() {
	for (let i = 1; i <= 30; i++) {
		await loadData(i);
	}
	console.log("Kanto Pokémon:", completePokedex.Kanto);
	displayPokedex("Kanto");
	toggleLoadMoreButton();
}

function toggleLoadMoreButton() {
	let loadMoreButton = document.getElementById("loadMoreButton");
	let input = document.getElementById("searchBar").value;

	if (input.length >= 3) {
		loadMoreButton.style.display = "none";
		return;
	}

	if (completePokedex.Kanto.length >= 151) {
		loadMoreButton.style.display = "none";
	} else if (completePokedex.Kanto.length >= 30) {
		loadMoreButton.style.display = "block";
	} else {
		loadMoreButton.style.display = "none";
	}
}

async function loadMore() {
	let loadMoreButton = document.getElementById("loadMoreButton");
	let loadingScreen = document.getElementById("loadingScreen");
	loadingScreen.style.display = "flex";
	for (let i = currentStartId; i < currentStartId + 30; i++) {
		if (i > 151) break;
		await loadData(i);
	}
	displayPokedex("Kanto");
	currentStartId += 30;
	toggleLoadMoreButton();
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

function render() {
	let pokemonContainer = document.getElementById("pokemonContainer");
	pokemonContainer.innerHTML = ""; // Nur den Pokémon-Container zurücksetzen
}

async function displayPokedex(region) {
	let pokemonContainer = document.getElementById("pokemonContainer");
	pokemonContainer.innerHTML = ""; // Nur Pokémon-Container leeren
	let regionData = completePokedex[region];
	if (!regionData) return; // error handling -> undefined ? functions stops : error
	for (let i = 0; i < regionData.length; i++) {
		let pokemon = regionData[i];
		let pokemonId = `${region}${i + 1}`;
		pokemonContainer.innerHTML += pokemonContainerHTML(pokemon, pokemonId, i); // Nur den Pokémon-Container updaten
	}
}

function searchPokemon() {
	let input = document.getElementById("searchBar").value.toLowerCase();
	let pokemonContainer = document.getElementById("pokemonContainer");
	let suggestionsList = document.getElementById("suggestions"); // Vorschlagsliste referenzieren
	pokemonContainer.innerHTML = "";

	// Wenn weniger als 3 Zeichen, Standardanzeige aktivieren
	if (input.length < 3) {
		displayPokedex("Kanto");
		toggleLoadMoreButton();
		suggestionsList.innerHTML = ""; // Vorschläge leeren
		suggestionsList.style.display = "none"; // Vorschlagsliste ausblenden
		return;
	}

	let filteredPokemon = completePokedex["Kanto"].filter((pokemon) =>
		pokemon.name.toLowerCase().includes(input)
	);

	// Vorschläge aufbauen
	suggestionsList.innerHTML = "";
	if (filteredPokemon.length === 0) {
		suggestionsList.style.display = "none"; // Keine Vorschläge -> ausblenden
	} else {
		filteredPokemon.forEach((pokemon) => {
			let li = document.createElement("li");
			li.textContent = pokemon.name;
			li.onclick = function () {
				document.getElementById("searchBar").value = pokemon.name;
				searchPokemon(); // Direkt nach Auswahl suchen
				suggestionsList.style.display = "none"; // Vorschlagsliste ausblenden
			};
			suggestionsList.appendChild(li);
		});
		suggestionsList.style.display = "block"; // Vorschläge einblenden
	}

	// Pokémon anzeigen
	if (filteredPokemon.length === 0) {
		pokemonContainer.innerHTML = `<p>Kein Pokémon gefunden.</p>`;
	} else {
		filteredPokemon.forEach((pokemon, i) => {
			let pokemonId = `Kanto${i + 1}`;
			pokemonContainer.innerHTML += pokemonContainerHTML(pokemon, pokemonId, i);
		});
	}

	// Load More Button verstecken während Suche
	document.getElementById("loadMoreButton").style.display = "none";
}
