const generateButton = document.getElementById("generate-btn");
const palettesContainer = document.getElementById("palettes-container");

generateButton.addEventListener("click", updateColorPalettes);
palettesContainer.addEventListener("click", handleClickPalettes);

function handleClickPalettes(event) {
  if (event.target.classList.contains("copy-btn")) {
    const colorHex = event.target.previousElementSibling.textContent;

    navigator.clipboard
      .writeText(colorHex)
      .then(() => showSuccessCopy(event.target))
      .catch((err) => {
        console.error(err);
      });
  } else if (
    event.target.classList.contains("color-palette") ||
    event.target.classList.contains("color-text")
  ) {
    const colorHex =
      event.target.nextElementSibling.querySelector(".color-text").textContent;

    navigator.clipboard
      .writeText(colorHex)
      .then(() =>
        showSuccessCopy(
          event.target.nextElementSibling.querySelector(".copy-btn"),
        ),
      )
      .catch((err) => {
        console.error(err);
      });
  }
}

function showSuccessCopy(element) {
  element.classList.remove("far", "fa-copy");
  element.classList.add("fas", "fa-check");

  element.style.color = "#48bb78";

  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");
    element.style.color = "";
  }, 1000);
}

let colorsPalette = [
  "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0"),
  "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0"),
  "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0"),
  "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0"),
  "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0"),
];

function generateColorPalettes() {
  for (let i = 0; i < colorsPalette.length; i++) {
    const randomColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    colorsPalette[i] = randomColor;
  }
}

function updateColorPalettes() {
  generateColorPalettes();
  renderColorPalettes(colorsPalette);
}

function renderColorPalettes(colors) {
  console.log("RUN renderColorPalettes");
  const palettes = document.querySelectorAll(".palette");

  palettes.forEach((elm, index) => {
    const color = colors[index];
    const colorHex = elm.querySelector(".color-text");
    const colorPalette = elm.querySelector(".color-palette");

    colorPalette.style.backgroundColor = color;
    colorHex.textContent = color;
  });
}

// renderColorPalettes(colorsPalette);
document.addEventListener("DOMContentLoaded", () => {
  renderColorPalettes(colorsPalette);
});
