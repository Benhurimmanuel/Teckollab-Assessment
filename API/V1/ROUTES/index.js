const express = require('express');
const { getAllTransactionsController } = require('../MODULES/CONTROLLER');

const router = express.Router();

router.route('/transactions').get(getAllTransactionsController);

module.exports = router;
