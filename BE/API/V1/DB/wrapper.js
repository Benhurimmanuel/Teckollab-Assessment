const { Op } = require('sequelize');
const { GENERAL_ORDER_BY } = require('../../../CONSTANTS/wrapperConstants');
const Transactions = require('../../../MODELS/transactions');

/*
 * @param {tableName, condition, pageNumber, pageSize } string,object,string,string
 * @return{result,null} object,null
 * @desc  get data based on condition from db, will return all data if condition not specified
 */
const getAllDataByCondition = async (
  tableName,
  condition,
  pageSize = 10,
  pageNumber = 0,
) => {
  const result = await tableName.findAndCountAll({
    where: { ...condition },
    limit: +pageSize,
    offset: +pageSize * +pageNumber,
    order: [GENERAL_ORDER_BY],
  });
  return { status: !!result, data: result || null };
};

/*
 * @param {tableName, searchQuery, pageNumber, pageSize } string,string,string,string
 * @return{result,null} object,null
 * @desc  get data based on searchqeury(parital match-case insesitve) from db
 */
const searchTransactions = async (
  tableName,
  searchQuery,
  pageSize = 10,
  pageNumber = 0,
) => {
  try {
    const result = await tableName.findAndCountAll({
      where: {
        [Op.or]: [
          {
            customer: {
              [Op.iLike]: `%${searchQuery}%`,
            },
          },
          {
            product: {
              [Op.iLike]: `%${searchQuery}%`,
            },
          },
        ],
      },
      limit: +pageSize,
      offset: +pageSize * +pageNumber,
      order: [GENERAL_ORDER_BY],
    });

    return { status: !!result, data: result || null };
  } catch (error) {
    console.error('Error searching transactions:', error);
    throw error;
  }
};

module.exports = {
  getAllDataByCondition, searchTransactions,
};
