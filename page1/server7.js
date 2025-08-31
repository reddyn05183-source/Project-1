const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory categories
let categories = ["Electronics", "Books", "Clothing"];

// Route: Show Add Category form
app.get("/add-category", (req, res) => {
  res.render("add-category");
});

// Route: Save new category
app.post("/add-category", (req, res) => {
  const categoryName = req.body.categoryName;
  if (categoryName) {
    categories.push(categoryName);
  }
  res.send(`<h2>Category "${categoryName}" Added!</h2><a href="/add-category">Go Back</a>`);
});

// Route: Show Edit Category form
app.get("/edit-category/:id", (req, res) => {
  const id = req.params.id;
  const category = categories[id];
  res.render("edit-category", { id, category });
});

// Route: Update category
app.post("/edit-category/:id", (req, res) => {
  const id = req.params.id;
  const updatedName = req.body.categoryName;
  if (updatedName) {
    categories[id] = updatedName;
  }
  res.send(`<h2>Category Updated to "${updatedName}"!</h2><a href="/edit-category/${id}">Go Back</a>`);
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
