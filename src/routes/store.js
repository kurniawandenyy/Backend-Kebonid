const express = require('express')
const Route = express.Router()
const todoList = require('../controllers/store')
const checkCache = require('../configs/cache')

Route
  .get('/', checkCache, todoList.getStore)
  .get('/:id', todoList.getStoreById)
  .post('/', todoList.createStore)
  .patch('/:id', todoList.updateStore)
  .delete('/:id', todoList.deleteStore)

module.exports = Route
