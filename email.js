import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { app } from "./firebaseconfig.js";
import { createEmail } from "server.js";

function registerUser(name, email) {
  const db = getDatabase(app);
  const userId = email.split("@")[0];
  console.log(userId);
  //path to the referrence in the db we want to use
  //TODO add the availability
  const referrence = ref(db, "users/" + userId);
  set(referrence, {
    username: email,
    name: name,
  });
}

document.getElementById("regForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("regEmail").value;
  const fname = document.getElementById("regName").value;
  const avail = document.getElementById("regStart").value;
  createEmail(email, fname, avail);
  if (email) {
    // Send the form data to the server
    fetch("/sendConfirmationEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, fname: fname, availability: avail }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        //clear the form only if the email sends
        registerUser(fname, email);

        document.getElementById("regForm").reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    console.log("Invalid email");
  }
});
