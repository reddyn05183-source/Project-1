const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory categories
let categories = ["Apple", "Samsung", "Nokia", "Microsoft"];

// Route: Show Delete Category page
app.get("/delete-category", (req, res) => {
  res.render("delete-category", { categories });
});

// Route: Handle Delete
app.post("/delete-category/:id", (req, res) => {
  const id = req.params.id;
  categories.splice(id, 1); // remove category by index
  res.redirect("/delete-category");
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
