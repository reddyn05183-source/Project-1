const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Serve payment page
app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, 'payment.html'));
});

// API to confirm order
app.post('/api/confirm-order', (req, res) => {
  const { paymentMethod } = req.body;
  console.log("Payment Selected:", paymentMethod);

  // In real case, process payment and save in database
  res.json({ success: true, message: `Order confirmed with ${paymentMethod}` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
