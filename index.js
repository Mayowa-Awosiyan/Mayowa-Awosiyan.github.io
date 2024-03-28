// Grab the consent button and buttons with the card class
const consentButton = document.getElementById("consentbtn");
const cardButtons = document.querySelectorAll(".card");

// Function to enable card buttons
function enableCardButtons() {
  cardButtons.forEach((button) => {
    button.disabled = false;
  });
}

// Event listener for the consent button click
consentButton.addEventListener("click", function () {
  enableCardButtons();
});
