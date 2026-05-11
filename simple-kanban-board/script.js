const draggableElements = document.querySelectorAll('div[draggable="true"');
const dropElements = document.querySelectorAll(".board");

draggableElements.forEach((draggableElement) => {
  draggableElement.addEventListener("dragstart", (event) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", draggableElement.id);
  });
});

dropElements.forEach((dropElement) => {
  dropElement.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  dropElement.addEventListener("dragenter", (event) => {
    dropElement.classList.add("over");
  });

  dropElement.addEventListener("dragleave", (event) => {
    dropElement.classList.remove("over");
  });

  dropElement.addEventListener("drop", (event) => {
    event.preventDefault();

    const listId = event.dataTransfer.getData("text/plain");
    const list = document.getElementById(listId);

    dropElement.appendChild(list);
    dropElement.classList.remove("over");
  });
});
