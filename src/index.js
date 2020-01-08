const express = require('express')
const Route = express.Router()

const product = require('./routes/product')
const auth = require('./routes/auth')
const transaction = require('./routes/transaction')

Route
  .use('/transaction', transaction)
  .use('/product', product)
  .use('/auth', auth)

module.exports = Route
