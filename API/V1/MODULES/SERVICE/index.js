const { UNSUCCESSFUL_MESSAGE, INTERNAL_SERVER_ERROR } = require('../../../../CONSTANTS/httpMessages');
const Transactions = require('../../../../MODELS/transactions');
const { getAllDataByCondition, searchTransactions } = require('../../DB/wrapper');
const { handleApiResponse } = require('../../UTILS');

const getAllTransactionsService = async (pageSize, pageNumber) => {
    try {
        const responsePayload = await getAllDataByCondition(Transactions, null, pageSize, pageNumber);
        if (responsePayload.status) {
            return handleApiResponse(200, {
                payload: {
                    count: responsePayload.data.count,
                    rows: responsePayload.data.rows,
                },
            });
        }
        return handleApiResponse(400, {
            message: UNSUCCESSFUL_MESSAGE,
        });
    } catch (error) {
        return handleApiResponse(500, {
            message: INTERNAL_SERVER_ERROR,
        });
    }
};

const searchTransactionsService = async (pageSize, pageNumber, searchQuery) => {
    try {
        const responsePayload = await searchTransactions(Transactions, searchQuery, pageSize, pageNumber);
        if (responsePayload.status) {
            return handleApiResponse(200, {
                payload: {
                    count: responsePayload.data.count,
                    rows: responsePayload.data.rows,
                },
            });
        }
        return handleApiResponse(400, {
            message: UNSUCCESSFUL_MESSAGE,
        });
    } catch (error) {
        return handleApiResponse(500, {
            message: INTERNAL_SERVER_ERROR,
        });
    }
};
module.exports = { getAllTransactionsService, searchTransactionsService };
