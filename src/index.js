const express = require('express')
const Route = express.Router()

const product = require('./routes/product')
const auth = require('./routes/auth')
const customers = require('./routes/customers')
const transaction = require('./routes/transaction')
const message = require('./routes/message')

Route
  .use('/transaction', transaction)
  .use('/product', product)
  .use('/auth', auth)
  .use('/customers', customers)
  .use('/message', message)

module.exports = Route
