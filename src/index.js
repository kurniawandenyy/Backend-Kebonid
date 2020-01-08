const express = require('express')
const Route = express.Router()

const product = require('./routes/product')
const auth = require('./routes/auth')
const cart = require('./routes/cart')
const customers = require('./routes/customers')
const transaction = require('./routes/transaction')

Route
  .use('/transaction', transaction)
  .use('/product', product)
  .use('/auth', auth)
  .use('/customers', customers)
  .use('/cart', cart)

module.exports = Route
