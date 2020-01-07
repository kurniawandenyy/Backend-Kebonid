const express = require('express')
const Route = express.Router()

const product = require('./routes/product')

Route
  .use('/product', product)

module.exports = Route
