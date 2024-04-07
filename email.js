document.getElementById("regForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("regEmail").value;

  if (email) {
    // Send the form data to the server
    fetch("/sendConfirmationEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    console.log("Invalid email");
  }
});
