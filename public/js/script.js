const addBox = document.querySelector(".add-box"),
  popUp = document.querySelector(".popup"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header span"),
  closeIcon = popupBox.querySelector("header i"),
  titleTag = popupBox.querySelector("#title"),
  descTag = popupBox.querySelector("#description"),
  addBtn = popupBox.querySelector(".btn");

const updatePopUp = document.querySelector(".update-popup"),
  updatePopupBox = document.querySelector(".update-popup-box"),
  updateCloseIcon = updatePopupBox.querySelector("header i"),
  noteIdTag = updatePopupBox.querySelector("#noteId"),
  updateTitleTag = updatePopupBox.querySelector("#title"),
  updateDescTag = updatePopupBox.querySelector("#description"),
  updateBtn = updatePopupBox.querySelector(".btn");

// Show pop-up
addBox.addEventListener("click", () => {
  titleTag.focus();
  popUp.classList.add("show");
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
});

// Close pop-up
// 1
closeIcon.addEventListener("click", () => {
  // titleTag.value = "";
  // descTag.value = "";
  popUp.classList.remove("show");
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});
updateCloseIcon.addEventListener("click", () => {
  updatePopUp.classList.remove("show");
  updatePopupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});
// 2
document.addEventListener("keyup", (event) => {
  if (event.key == "Escape") {
    closeIcon.click();
    updateCloseIcon.click();
  }
});
// 3
document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("popup") ||
    event.target.classList.contains("update-popup")
  ) {
    closeIcon.click();
    updateCloseIcon.click();
  }
});

// Show settings menu
function showMenu(element) {
  element.parentElement.classList.add("show");
  document.addEventListener("click", (event) => {
    if (event.target.tagName != "I" || event.target != element) {
      element.parentElement.classList.remove("show");
    }
  });
}

// Update note
function updateNote(noteId, title, description) {
  noteIdTag.value = noteId;
  updateTitleTag.value = title;
  updateDescTag.value = description;
  updateTitleTag.focus();
  updatePopUp.classList.add("show");
  updatePopupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
}
