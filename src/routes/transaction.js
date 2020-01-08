const express = require('express')
const transactions = require('../controllers/transactions')
const Route = express.Router()
const checkCache = require('../configs/cache')

Route
  .get('/:id', checkCache, transactions.getTransactions)
  .post('/', transactions.addTransaction)
  .delete('/:id', transactions.deleteTransaction)
module.exports = Route
