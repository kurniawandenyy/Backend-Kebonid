const express = require('express')
const Route = express.Router()

const auth = require('../controllers/auth')

Route
  .post('/register', auth.register)
  .post('/login', auth.login)
  .post('/forgot', auth.forgot)
  .post('/reset', auth.reset)
  .put('/update', auth.update)

module.exports = Route
