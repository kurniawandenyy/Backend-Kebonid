const express = require('express')
const Route = express.Router()

const product = require('./routes/product')
const store = require('./routes/store')
const auth = require('./routes/auth')
const cart = require('./routes/cart')
const customers = require('./routes/customers')
const wishlist = require('./routes/wishlist')
const transaction = require('./routes/transaction')
const message = require('./routes/message')

Route
  .use('/transaction', transaction)
  .use('/product', product)
  .use('/store', store)
  .use('/auth', auth)
  .use('/customers', customers)
  .use('/message', message)
  .use('/cart', cart)
  .use('/wishlist', wishlist)

module.exports = Route
