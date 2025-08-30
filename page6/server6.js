const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Categories list (in-memory for now)
let categories = [];

// Route: show Add Category form
app.get("/add-category", (req, res) => {
  res.render("add-category");
});

// Route: handle form submission
app.post("/add-category", (req, res) => {
  const categoryName = req.body.categoryName;
  if (categoryName) {
    categories.push(categoryName);
  }
  res.send(`<h2>Category "${categoryName}" Added!</h2><a href="/add-category">Go Back</a>`);
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/add-category");
});
