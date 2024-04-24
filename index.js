//firebase login
import { app } from "./firebaseconfig.js";
//import the microsoft Graph API
import { Client } from "./node_modules/@microsoft/microsoft-graph-client";
import {
  getAuth,
  signInWithPopup,
  OAuthProvider,
  signInWithRedirect,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const auth = getAuth();
const provider = new OAuthProvider("microsoft.com");

// Grab parts of the page for future reference
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

provider.setCustomParameters({
  prompt: "consent",
});
//add the additional permisions to email a user and update their calendar
provider.addScope("email");
provider.addScope("Calendars.ReadWrite");

loginbtn.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      // User is signed in.
      // IdP data available in result.additionalUserInfo.profile.
      // Get the OAuth access token and ID Token
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      const idToken = credential.idToken;
      const user = result.user;
      console.log(user);

      const displayName = user.displayName;
      document.getElementById("currUserName").textContent = displayName;
      getAuthenticatedClient(accessToken);
      createEvent(accessToken);
    })
    .catch((error) => {
      // Handle error.
      console.log(error);
    });
});

function getAuthenticatedClient(accessToken) {
  // Initialize the Graph client
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken); // First parameter takes an error if you can't get an access token
    },
  });
}

async function createEvent(accessToken) {
  const client = getAuthenticatedClient(accessToken);
  const event = {
    subject: "Meeting",
    body: {
      contentType: "HTML",
      content: "Discuss project updates",
    },
    start: {
      dateTime: "2024-05-01T12:00:00",
      timeZone: "Pacific Standard Time",
    },
    end: {
      dateTime: "2024-05-01T13:00:00",
      timeZone: "Pacific Standard Time",
    },
    location: {
      displayName: "Conference Room",
    },
  };

  try {
    const response = await client.api("/me/events").post(event);
    console.log("Event created", response);
  } catch (error) {
    console.error("Could not create event", error);
  }
}

//Logout the current user when the log out button is clicked
logoutbtn.addEventListener("click", function () {
  const auth = getAuth();
  console.log("attempting");
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("USER LOGGED OUT");
      //Reset the username in the top right corner
      document.getElementById("currUserName").textContent = "Welcome!";
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
});

// Functions to enable/disable card buttons
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
