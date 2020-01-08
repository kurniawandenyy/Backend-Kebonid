const express = require('express')
const Route = express.Router()

const product = require('./routes/product')
const store = require('./routes/store')
Route
  .use('/product', product)
  .use('/store', store)

module.exports = Route
