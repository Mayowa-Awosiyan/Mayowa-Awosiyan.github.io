// Grab the consent button and buttons with the card class
const consentButton = document.getElementById("consentbtn");
const cardButtons = document.querySelectorAll(".card");

// Function to enable card buttons
function enableCardButtons() {
  cardButtons.forEach((button) => {
    button.disabled = false;
  });
}

function disableCardButtons() {
  cardButtons.forEach((button) => {
    button.disabled = true;
  });
}

// Event listener for the consent button click
consentButton.addEventListener("click", function () {
  //TODO add a modal showing terms and conditions with an accept and decline option
  if (consentButton.checked == true) {
    enableCardButtons();
  } else {
    disableCardButtons();
  }
});
