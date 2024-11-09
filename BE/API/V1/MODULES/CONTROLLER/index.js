const { getAllTransactionsService, searchTransactionsService } = require('../SERVICE');

const getAllTransactionsController = async (req, res, next) => {
    try {
        const { pagesize: pageSize, pagenumber: pageNumber, searchquery: searchQuery } = req.query;
        let result;
        if (searchQuery) {
            result = await searchTransactionsService(pageSize, pageNumber, searchQuery);
        } else {
            result = await getAllTransactionsService(pageSize, pageNumber);
        }
        const { statusCode, responsePayload } = result;
        res.status(statusCode).send({ responsePayload });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllTransactionsController };
