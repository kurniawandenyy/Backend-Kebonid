const express = require('express')
const message = require('../controllers/message')
const Route = express.Router()

Route
  .get('/:id', message.getMessage)
  .post('/', message.addMessage)
module.exports = Route
