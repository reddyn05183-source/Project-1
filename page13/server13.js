// Product details page
app.get('/product', (req, res) => {
  res.sendFile(path.join(__dirname, 'product.html'));
});
