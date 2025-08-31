const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// In-memory product storage
let products = [
  { code: "123", name: "Iphone-6s", category: "Apple", amount: 35000 }
];

// API routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  products.push(req.body);
  res.json({ message: "Product added" });
});

app.put('/api/products/:code', (req, res) => {
  const { code } = req.params;
  products = products.map(p => p.code === code ? { ...p, ...req.body } : p);
  res.json({ message: "Product updated" });
});

app.delete('/api/products/:code', (req, res) => {
  const { code } = req.params;
  products = products.filter(p => p.code !== code);
  res.json({ message: "Product deleted" });
});

// Serve HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
