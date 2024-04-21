//firebase login
import { app } from "./firebaseconfig.js";
import {
  getAuth,
  signInWithPopup,
  OAuthProvider,
  signInWithRedirect,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const auth = getAuth();
const provider = new OAuthProvider("microsoft.com");
// Grab the consent button and buttons with the card class
const consentButton = document.getElementById("consentbtn");
const cardButtons = document.querySelectorAll(".card");
const loginbtn = document.getElementById("UoLogin");
const logoutbtn = document.getElementById("logoutbtn");
//This should make it so only uottawa associated accounts can use the service
//Tenant ID can be found in azure by using a Uottawa account
/*
provider.setCustomParameters({
  tenant: tenantID,
});
*/

//provider.addScope("calendars.read");
//provider.addScope("calendars.write");

provider.setCustomParameters({
  prompt: "consent",
});

loginbtn.addEventListener("click", function () {
  console.log("Login in Clicked");
  /*signInWithPopup(auth, provider)
    .then((result) => {
      // User is signed in.
      // IdP data available in result.additionalUserInfo.profile.

      // Get the OAuth access token and ID Token
      console.log(result);
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      const idToken = credential.idToken;
    })
    .catch((error) => {
      // Handle error.
      console.log(error);
    });
    */

  signInWithPopup(auth, provider)
    .then((result) => {
      // User is signed in.
      // IdP data available in result.additionalUserInfo.profile.
      console.log(result, "THAT's ALL FOLKS");

      // Get the OAuth access token and ID Token
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      const idToken = credential.idToken;
    })
    .catch((error) => {
      // Handle error.
      console.log("SO CLOSE!!");
      console.log(error);
    });
});
//Logout the current user when the log out button is clicked
logoutbtn.addEventListener("click", function () {
  const auth = getAuth();
  console.log("attempting");
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("USER LOGGED OUT");
    })
    .catch((error) => {
      // An error happened.
    });
});

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
//Event listener for profile widget to expose dropdown menu
document
  .querySelector(".profile-widget")
  .addEventListener("click", function () {
    var dropdown = this.querySelector(".dropdown-menu");
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });
