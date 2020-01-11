const express = require('express')
const Route = express.Router()

const wishlist = require('../controllers/wishlist')

Route
  .post('/', wishlist.createWishlist)
  .get('/:id', wishlist.getWishlist)
  .get('/', wishlist.getAllWishlist)
  .delete('/:id', wishlist.deleteWishlist)

module.exports = Route
