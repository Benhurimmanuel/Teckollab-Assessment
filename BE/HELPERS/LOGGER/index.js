const { devLogger, productionLogger, stagingLogger } = require('./logger');

let logger = null;
if (process.env.NODE_ENV === 'development') {
    logger = devLogger();
} else if (process.env.NODE_ENV === 'production') {
    logger = productionLogger();
} else if (process.env.NODE_ENV === 'test') {
    logger = stagingLogger();
}

module.exports = logger;
