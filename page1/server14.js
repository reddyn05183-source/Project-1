const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Serve order page
app.get('/order', (req, res) => {
  res.sendFile(path.join(__dirname, 'order.html'));
});

// API to handle order submission
app.post('/api/order', (req, res) => {
  const { name, address, phone } = req.body;
  console.log("New Order:", { name, address, phone });

  // In real case, save order in database
  res.json({ success: true, message: "Order placed successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
