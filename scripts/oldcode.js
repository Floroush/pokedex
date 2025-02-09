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

// async function init() {
// 	for (let i = 1; i <= 30; i++) {
// 		await loadData(i);
// 	}
// 	console.log("Kanto Pokémon:", completePokedex.Kanto);
// 	displayPokedex("Kanto");
// 	toggleLoadMoreButton();
// }

// async function displayPokedex(region) {
// 	let pokemonContainer = document.getElementById("pokemonContainer");
// 	pokemonContainer.innerHTML = "";
// 	let regionData = completePokedex[region];
// 	if (!regionData) return; // error handling -> undefined ? functions stops : error
// 	for (let i = 0; i < regionData.length; i++) {
// 		let pokemon = regionData[i];
// 		let pokemonId = `${region}${i + 1}`;
// 		pokemonContainer.innerHTML += pokemonContainerHTML(pokemon, pokemonId, i);
// 	}
// }

function render() {
	let pokemonContainer = document.getElementById("pokemonContainer");
	pokemonContainer.innerHTML = "";
}
