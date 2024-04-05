const express = require("express");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const { fname, email, availability } = req.body;

  const msg = {
    to: email, // Change to your recipient
    from: "surrogateavatar@outlook.com", // Change to your verified sender
    subject: "Availability Confirmation",
    text:
      "Hello " +
      fname +
      "! This email is to confirm that you are registered as a Surrogate avatar that is available at " +
      availability +
      ". If this time is incorrect please go back to the web page and change your start time",
    html:
      "<strong>This email is to confirm that you are registered as a Surrogate avatar that is available at " +
      availability +
      ". If this time is incorrect please go back to the web page and change your start time</strong>",
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.json({ message: "Email sent successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to send email" });
    });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
