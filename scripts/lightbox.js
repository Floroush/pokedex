const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

lightbox.addEventListener("click", (e) => {
	if (e.target !== e.currentTarget) return;
	lightbox.classList.remove("active");
	lightbox.innerHTML = "";
});

function displayImages(i, img) {
	return /*html*/ `<img id="kanto${i}" class="gallery-container__image" src="${img}" onclick="showImage(${i})"/>`;
}

function showImage(i) {
	createButton(`&#10094;`, `${i}`, "Previous", "left");
	createImage(i);
	createButton(`&#10095;`, `${i}`, "Next", "right");
}

function createImage(i, j) {
	document.getElementById("lightbox").classList.add("active");
	let image = document.getElementById("lightbox");
	image.innerHTML += /*html*/ `<img src="${completePokedex[i][j]}"></img>`;
}

function createButton(arrowDirection, i, j, slideshowDirection, arrowSide) {
	let button = document.getElementById("lightbox");
	button.innerHTML += /*html*/ `<button class="arrow-button ${arrowSide}" onclick='show${slideshowDirection}Image(${i})'>${arrowDirection}</button>`;
}

function showNextImage(i) {
	lightbox.innerHTML = "";
	if (i + 1 < completePokedex.length) {
		i++;
	} else {
		i = 0;
	}
	createButton(`&#10094;`, `${i}`, "Previous", "left");
	createImage(i);
	createButton(`&#10095;`, `${i}`, "Next", "right");
}

function showPreviousImage(i) {
	lightbox.innerHTML = "";
	i--;
	if (i < 0) {
		i = completePokedex.length - 1;
	}
	createButton(`&#10094;`, `${i}`, "Previous");
	createImage(i);
	createButton(`&#10095;`, `${i}`, "Next");
}
