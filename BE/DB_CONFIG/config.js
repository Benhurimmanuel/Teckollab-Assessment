const Sequelize = require('sequelize');
const logger = require('../HELPERS/LOGGER');
const sequelize = new Sequelize(
  process.env.DB_DATABASE_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
    dialectOptions: {
      useUTC: false,
    },
    timezone: '+05:30',
  },
);
(async () => {
  try {
    await sequelize.authenticate();
    console.info("Database connected Successfully")
    // clean wipe
    // await sequelize.sync({ force: true });

    // alter Table
    await sequelize.sync({ alter: true });

    // sync Table
    await sequelize.sync();
  } catch (error) {
    console.error("Database connection Unsuccessful");
    logger.error(error);
  }
})();

module.exports = sequelize;
