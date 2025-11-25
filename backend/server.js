const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/database');
const userRoutes = require("./routes/users");


// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
const bookingRoutes = require('./routes/booking');
app.use('/api/bookings', bookingRoutes);
app.use("/api/users", userRoutes);

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
    res.sendFile(path.join(__dirname, '../public', 'profile.html'));
});
const session = require("express-session");

app.use(
  session({
    secret: "secret123",
    resave: false,
    saveUninitialized: false
  })
);




const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));