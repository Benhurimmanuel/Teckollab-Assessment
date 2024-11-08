require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');
require("./DB_CONFIG/config");
const cors = require('cors');
const logger = require('./HELPERS/LOGGER/index');
const { errorHandler } = require('./HELPERS/ERROR_HANDLERS/generalErrors');
const v1Routes = require('./API/V1/ROUTES');

const app = express();

// CORS 
const corsOptions = {
    origin: process.env.CORS_FE, methods: ['GET'], allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());

// Routes
app.use('/api/v1', v1Routes);
app.use('/api/ping', (req, res) => {
    res.send('pong');
});

// Error Handlers
app.use(errorHandler);

// Server
app.listen(process.env.SERVER_PORT, () => {
    logger.info(`App running on port ${process.env.SERVER_PORT}`);
});
