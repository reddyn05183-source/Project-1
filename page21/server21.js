let currentUser = null;

// During login, save current user
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    u => (u.email === email || u.firstName === email) && u.password === password
  );

  if (!user) {
    return res.json({ success: false, message: "Invalid email/username or password" });
  }

  currentUser = user; // Save logged-in user
  res.json({ success: true, message: "Login successful!" });
});

// Fetch current user details
app.get("/api/user", (req, res) => {
  if (!currentUser) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.json({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phoneNumber: currentUser.phoneNumber,
    address: currentUser.address,
    cart: currentUser.cart || []
  });
});

// Logout
app.get("/api/logout", (req, res) => {
  currentUser = null;
  res.json({ message: "Logged out successfully" });
});
