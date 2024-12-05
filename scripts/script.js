async function init() {
	for (let i = 1; i < 1026; i++) {
		// always Pokédex No.++
		await loadData(i);
	}
	console.log("Kanto Pokémon:", completePokedex.Kanto);
	console.log("Johto Pokémon:", completePokedex.Johto);
	console.log("Hoenn Pokémon:", completePokedex.Hoenn);
	console.log("Sinnoh Pokémon:", completePokedex.Sinnoh);
	console.log("Unova Pokémon:", completePokedex.Unova);
	console.log("Kalos Pokémon:", completePokedex.Kalos);
	console.log("Alola Pokémon:", completePokedex.Alola);
	console.log("Galar Pokémon:", completePokedex.Galar);
	console.log("Paldea Pokémon:", completePokedex.Paldea);
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
	let pokemonContainer = document.getElementById("main");
	pokemonContainer.innerHTML = "";
}

async function displayPokedex(region) {
	let pokemonContainer = document.getElementById("main");
	pokemonContainer.innerHTML = "";
	let regionData = completePokedex[region];
	if (!regionData) return; // error handling -> undefined ? functions stops : error
	for (let i = 0; i < regionData.length; i++) {
		let pokemon = regionData[i];
		let pokemonId = `${region}${i + 1}`;
		pokemonContainer.innerHTML += pokemonContainerHTML(pokemon, pokemonId, i);
	}
}
