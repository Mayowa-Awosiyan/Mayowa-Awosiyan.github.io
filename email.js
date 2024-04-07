document.getElementById("regForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("regEmail").value;
  const fname = document.getElementById("regName").value;
  const avail = document.getElementById("regStart").value;

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
        console.log("BODY: ", body);
        //clear the form only if the email sends
        document.getElementById("regForm").reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    console.log("Invalid email");
  }
});
