const express = require('express');
require('./DB_CONFIG/config'); // Ensure this file is properly setting up DB connection.
const cors = require('cors');
const logger = require('./HELPERS/LOGGER/index');
const { errorHandler } = require('./HELPERS/ERROR_HANDLERS/generalErrors');
const v1Routes = require('./API/V1/ROUTES');
require('dotenv').config(); // Load environment variables

const app = express();

// CORS Options
const corsOptions = {
    origin: process.env.CORS_FE || '*', // Use a fallback in case CORS_FE is not set
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // More common HTTP methods allowed
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());

// Routes
app.use('/api/v1', v1Routes);

// Ping Route
app.use('/api/ping', (req, res) => {
    res.send('pong');
});

// Global Error Handler (ensure this is placed after route definitions)
app.use(errorHandler);

// Start Server
app.listen(process.env.SERVER_PORT, () => {
    logger.info(`App running on port ${process.env.SERVER_PORT}`);
});
