const express = require('express')
const Route = express.Router()
const todoList = require('../controllers/store')
Route
  .get('/', todoList.getStore)
  .get('/:id', todoList.getStoreById)
  .post('/', todoList.createStore)
  .patch('/:id', todoList.updateStore)
  .delete('/:id', todoList.deleteStore)

module.exports = Route
