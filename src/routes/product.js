const express = require('express')
const Route = express.Router()
Route
  .get('/', (req, res) => res.status(200).json({
    status: 201,
    message: 'OK'
  }))
module.exports = Route
