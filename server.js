const express = require("express");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");
const app = express();
const port = 3000;

app.use(bodyParser.json());
export function createEmail(email, fname, availability) {
  console.log(availability);
  const msg = {
    to: email, // The current user's email address
    from: "surrogateavatar@outlook.com", // The verified sender setup on the SendGrid website
    subject: "Availability Confirmation", // The email subject line
    text:
      "Hello " +
      fname +
      "! This email is to confirm that you are registered as a Surrogate avatar that is available at " +
      availability +
      ". If this time is incorrect please go back to the web page and change your start time", // The text of the email
    html:
      "<strong>This email is to confirm that you are registered as a Surrogate avatar that is available at " +
      availability +
      ". If this time is incorrect please go back to the web page and change your start time</strong>", // The HTML of the email
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
}

//createEmail("oawos064@uottawa.ca", "Mayowa");
/*app.post("/sendConfirmationEmail", (req, res) => {
  const { email, fname, availability } = req.body;
  console.log("REACHED FUCNTION");
});
*/
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
