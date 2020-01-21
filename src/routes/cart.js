const express = require('express')
const Route = express.Router()

const cart = require('../controllers/cart')

Route
  .post('/', cart.createCart)
  .get('/:id', cart.getCart)
  .delete('/:id', cart.deleteCart)
  .put('/:id', cart.updateCart)

module.exports = Route
