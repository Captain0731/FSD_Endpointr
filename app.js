const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler');

// Middleware to parse JSON
app.use(express.json());

// Import routes
const studentRoutes = require('./routes/studentroute');
const productRoutes = require('./routes/productroute');
const userRoutes = require('./routes/userroute');
const cartRoutes = require('./routes/cartroute');
const orderRoutes = require('./routes/orderroute');

// Use routes
app.use('/students', studentRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

// Global Error Handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
