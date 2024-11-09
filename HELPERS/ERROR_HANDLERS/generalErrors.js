const logger = require('../LOGGER');

const errorHandler = (error, req, res, next) => {
  console.log({ error });
  const response = {
    status: false,
  };
  switch (error.name) {
    case 'SequelizeUniqueConstraintError': {
      response.errName = error.errors[0].type;
      response.message = error.errors[0].message;
      logger.error(JSON.stringify(response));
      res.status(422).send(response);
      break;
    }
    case 'JsonWebTokenError': {
      response.errName = error.name;
      response.message = error.message;
      logger.error(JSON.stringify(response));
      res.status(422).send(response);
      break;
    }
    case 'SequelizeDatabaseError': {
      response.errName = error.name;
      response.message = error.message;
      logger.error(JSON.stringify(response));
      res.status(422).send(response);
      break;
    }
    case 'TypeError': {
      response.errName = error.name;
      response.message = error.message;
      logger.error(JSON.stringify(response));
      res.status(422).send(response);
      break;
    }
    case 'TokenExpiredError': {
      response.errName = error.name;
      response.message = error.message;
      logger.error(JSON.stringify(response));
      res.status(422).send(response);
      break;
    }
    case 'ReferenceError': {
      response.errName = error.name;
      response.message = error.message;
      logger.error(JSON.stringify(response));
      res.status(422).send(response);

      break;
    }
    default: {
      response.errName = error.name;
      response.message = error.message;
      logger.error(JSON.stringify(response));
      res.status(400).send(response);
    }
  }
};

module.exports = {
  errorHandler,
};
