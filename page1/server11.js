const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

let products = [
  { code: "123", name: "Iphone-6s", category: "Apple", amount: 35000 }
];

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get single product by code
app.get('/api/products/:code', (req, res) => {
  const product = products.find(p => p.code === req.params.code);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// Add product
app.post('/api/products', (req, res) => {
  const { code, name, category, amount } = req.body;
  if (!code || !name || !category || !amount) {
    return res.status(400).json({ message: "All fields required" });
  }
  products.push({ code, name, category, amount: Number(amount) });
  res.json({ message: "Product added" });
});

// Edit product
app.put('/api/products/:code', (req, res) => {
  const { code } = req.params;
  let product = products.find(p => p.code === code);
  if (!product) return res.status(404).json({ message: "Product not found" });

  product.name = req.body.name || product.name;
  product.category = req.body.category || product.category;
  product.amount = req.body.amount || product.amount;

  res.json({ message: "Product updated" });
});

// Delete product
app.delete('/api/products/:code', (req, res) => {
  products = products.filter(p => p.code !== req.params.code);
  res.json({ message: "Product deleted" });
});

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/add', (req, res) => res.sendFile(path.join(__dirname, 'add-product.html')));
app.get('/edit', (req, res) => res.sendFile(path.join(__dirname, 'edit-product.html')));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
