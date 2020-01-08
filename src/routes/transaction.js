const express = require('express')
const transactions = require('../controllers/transactions')
const Route = express.Router()

Route
.get('/', transactions.getTransactions)
.post('/', transactions.addTransaction)
.delete('/:id', transactions.deleteTransaction)
module.exports = Route
