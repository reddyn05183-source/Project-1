// API: User Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => (u.email === email || u.firstName === email) && u.password === password);

  if (!user) {
    return res.json({ success: false, message: "Invalid email/username or password" });
  }

  res.json({ success: true, message: "Login successful!" });
});
