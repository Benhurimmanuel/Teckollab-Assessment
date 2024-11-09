const { Sequelize } = require('sequelize');
const logger = require('../HELPERS/LOGGER');
require('dotenv').config();

console.log(5, { DB_DATABASE_NAME: process.env.DB_DATABASE_NAME });
const sequelize = new Sequelize(
  process.env.DB_DATABASE_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mssql',
    port: process.env.DB_PORT,
    logging: false,
    dialectOptions: {
      encrypt: true,
      useUTC: false,
    },
    timezone: '+05:30',
  },
);

(async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connected successfully');

    // Clean wipe (Drop and recreate tables)
    // await sequelize.sync({ force: true });

    // Sync table and alter the schema
    await sequelize.sync({ alter: true });

    // Sync table
    await sequelize.sync();
  } catch (error) {
    console.log({ error });
    console.error('Database connection unsuccessful');
    logger.error(error);
  }
})();

module.exports = sequelize;

// const { Sequelize } = require('sequelize');
// const logger = require('../HELPERS/LOGGER');
// require('dotenv').config();

// const sequelize = new Sequelize(
//   'teckollab-assessment',
//   'admin_user',
//   'StrongPassword123!',
//   {
//     host: 'teckollab-assessment.database.windows.net',
//     dialect: 'mssql',
//     port: 1433,
//     logging: false,
//     dialectOptions: {
//       encrypt: true,
//       useUTC: false,
//     },
//     timezone: '+05:30',
//   },
// );

// (async () => {
//   try {
//     await sequelize.authenticate();
//     logger.info('Database connected successfully');

//     // Clean wipe (Drop and recreate tables)
//     // await sequelize.sync({ force: true });

//     // Sync table and alter the schema
//     await sequelize.sync({ alter: true });

//     // Sync table
//     await sequelize.sync();
//   } catch (error) {
//     console.log({ error });
//     console.error('Database connection unsuccessful');
//     logger.error(error);
//   }
// })();

// module.exports = sequelize;
