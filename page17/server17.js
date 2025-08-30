const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

let cart = [
  { name: "Product 1", details: "This is product 1", image: "https://via.placeholder.com/100" },
  { name: "Product 2", details: "This is product 2", image: "https://via.placeholder.com/100" }
];

let orderData = {}; // store temporary order info

// Serve cart page
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'cart.html'));
});

// Get cart items
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// Remove item from cart
app.post('/api/cart/remove', (req, res) => {
  const { index } = req.body;
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
  }
  res.json({ success: true });
});

// Continue with shipping, payment, confirmation routes...
// (same as before)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
