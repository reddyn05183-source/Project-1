const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public")); // serve HTML files

// Fake database (for demo)
let users = [];

// API: Register User
app.post("/api/register", (req, res) => {
  const { firstName, lastName, gender, dob, address, email, password, confirmPassword, phone } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.json({ success: false, message: "Please fill all required fields." });
  }

  if (password !== confirmPassword) {
    return res.json({ success: false, message: "Passwords do not match." });
  }

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.json({ success: false, message: "Email already registered." });
  }

  users.push({ firstName, lastName, gender, dob, address, email, password, phone });
  console.log("Registered Users:", users);

  res.json({ success: true, message: "Registration successful!" });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
