const express = require('express');
const connectDb = require('./config/dbConnection');
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(errorHandler);

// Users
app.use('/api/users', require("./routes/userRoutes"));
//Products
app.use('/api/products', require("./routes/productRoutes"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});