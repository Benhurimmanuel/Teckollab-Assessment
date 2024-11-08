const { getAllTransactionsService, searchTransactionsService } = require('../SERVICE');

const getAllTransactionsController = async (req, res, next) => {
    try {
        const { user, accountType, method } = req;
        const route = req.originalUrl;
        const { pagesize: pageSize, pagenumber: pageNumber, searchquery: searchQuery } = req.query;
        let result;
        if (searchQuery) {
            result = await searchTransactionsService(user, route, accountType, method, pageSize, pageNumber, searchQuery);
        } else {
            result = await getAllTransactionsService(user, route, accountType, method, pageSize, pageNumber);
        }
        const { statusCode, responsePayload } = result;
        res.status(statusCode).send({ responsePayload });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllTransactionsController };
