const express = require('express')
const Route = express.Router()
const todoList = require('../controllers/product')
Route
  .get('/', todoList.getProduct)
  .get('/:id', todoList.getProductById)
  .post('/', todoList.createProduct)
  .patch('/:id', todoList.updateProduct)
  .delete('/:id', todoList.deleteProduct)

module.exports = Route
