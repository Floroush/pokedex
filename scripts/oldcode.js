// async function initPage() {
// 	const loadingScreen = document.getElementById("loadingScreen");
// 	showLoadingScreen(loadingScreen);
// 	await loadPokemonData();
// 	displayPokedex("Kanto");
// 	toggleRegionButton("kantoButton");
// 	toggleLoadMoreButton("Kanto");
// 	hideLoadingScreen(loadingScreen);
// }

// function updatePokemonOverlay() {
// 	let pokemon = completePokedex[currentRegion][currentPokemonIndex];
// 	document.getElementById("pokemonContent").innerHTML = `
//         <h2>${pokemon.name}</h2>
//         <img src="${pokemon.sprite}" alt="${pokemon.name}">
//         <p>HP: ${pokemon.hp}</p>
//         <p>Attack: ${pokemon.attack}</p>
//         <p>Defense: ${pokemon.defense}</p>
//         <p>Sp. Attack: ${pokemon.special_attack}</p>
//         <p>Sp. Defense: ${pokemon.special_defense}</p>
//         <p>Speed: ${pokemon.speed}</p>
//     `;
// }

// function updatePokemonOverlay() {
// 	let pokemon = completePokedex[currentRegion][currentPokemonIndex];
// 	document.getElementById("pokemonContent").innerHTML = `
//         <h2>${pokemon.name}</h2>
//         <img src="${pokemon.sprite}" alt="${pokemon.name}">
//         <p>HP: ${pokemon.hp}</p>
//         <p>Attack: ${pokemon.attack}</p>
//         <p>Defense: ${pokemon.defense}</p>
//         <p>Sp. Attack: ${pokemon.special_attack}</p>
//         <p>Sp. Defense: ${pokemon.special_defense}</p>
//         <p>Speed: ${pokemon.speed}</p>
//     `;
// }
