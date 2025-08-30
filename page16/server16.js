const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

let orderData = {}; // store temporary order info

// Serve confirmation page
app.get('/order-confirmed', (req, res) => {
  res.sendFile(path.join(__dirname, 'order-confirmed.html'));
});

// Save shipping details
app.post('/api/shipping', (req, res) => {
  const { name, address, phone } = req.body;
  orderData = { ...orderData, name, address, phone };
  res.json({ success: true });
});

// Save payment method
app.post('/api/confirm-order', (req, res) => {
  const { paymentMethod } = req.body;
  orderData = { ...orderData, paymentMethod };
  res.json({ success: true, message: "Order Confirmed" });
});

// Return order summary
app.get('/api/order-summary', (req, res) => {
  res.json(orderData);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
