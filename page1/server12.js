// Route for delete confirmation page
app.get('/delete', (req, res) => res.sendFile(path.join(__dirname, 'delete-product.html')));
