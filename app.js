const express = require('express');
const app = express();
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");

// Middleware to parse JSON
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Demo", {
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Import routes
const studentRoutes = require('./routes/studentroute');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Use routes
app.use('/students', studentRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/cart', cartRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route ' + req.originalUrl + ' not found' });
});

// Global error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
