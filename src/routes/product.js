const express = require('express')
const Route = express.Router()
const todoList = require('../controllers/product')
const checkCache = require('../configs/cache')
Route
  .get('/', checkCache, todoList.getProduct)
  .get('/:id', todoList.getProductById)
  .post('/', todoList.createProduct)
  .patch('/:id', todoList.updateProduct)
  .delete('/:id', todoList.deleteProduct)

module.exports = Route
