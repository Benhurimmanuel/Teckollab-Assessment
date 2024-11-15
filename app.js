const express = require('express');
const path = require('path');
require('./DB_CONFIG/config');
const cors = require('cors');
const logger = require('./HELPERS/LOGGER/index');
const { errorHandler } = require('./HELPERS/ERROR_HANDLERS/generalErrors');
const v1Routes = require('./API/V1/ROUTES');
require('dotenv').config();

const app = express();

// CORS Options
const corsOptions = {
    origin: '*', // Use a fallback in case CORS_FE is not set
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // More common HTTP methods allowed
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());

// Serve React build
const buildPath = path.join(__dirname, 'FE', 'dist');
app.use(express.static(buildPath));

// API Routes
app.use('/api/v1', v1Routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Ping Route
app.use('/api/ping', (req, res) => {
    res.send('pong');
});

app.use(errorHandler);

// Start Server
app.listen(process.env.SERVER_PORT, () => {
    logger.info(`App running on port ${process.env.SERVER_PORT}`);
});
