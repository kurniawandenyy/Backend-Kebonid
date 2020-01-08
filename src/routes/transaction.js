const express = require('express')
const transactions = require('../controllers/transactions')
const Route = express.Router()

Route
.get('/:id', transactions.getTransactions)
.post('/', transactions.addTransaction)
.delete('/:id', transactions.deleteTransaction)
module.exports = Route
