const express = require('express')
const Route = express.Router()

const product = require('./routes/product')
const transaction = require('./routes/transaction')

Route
  .use('/product', product)
  .use('/transaction', transaction)

module.exports = Route
