const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Sample category data
let categories = ["Apple", "Samsung", "Nokia", "Micromax"];

app.use(bodyParser.json());
app.use(express.static(__dirname)); // to serve HTML

// Get categories
app.get('/categories', (req, res) => {
  res.json(categories);
});

// Add category
app.post('/add', (req, res) => {
  const { name } = req.body;
  if (name && !categories.includes(name)) {
    categories.push(name);
  }
  res.json({ success: true });
});

// Delete category
app.get('/delete/:name', (req, res) => {
  categories = categories.filter(c => c !== req.params.name);
  res.redirect('/categories.html');
});

// Edit category (rename)
app.get('/edit/:name', (req, res) => {
  const oldName = req.params.name;
  const newName = oldName + "_Edited"; // just demo
  categories = categories.map(c => c === oldName ? newName : c);
  res.redirect('/categories.html');
});

// Logout
app.get('/logout', (req, res) => {
  res.send("Logged out successfully!");
});

// Admin homepage link
app.get('/admin', (req, res) => {
  res.send("<h1>Welcome to Admin Homepage</h1><a href='/categories.html'>Go to Categories</a>");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
