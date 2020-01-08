const express = require('express')
const Route = express.Router()

const customers = require('../controllers/customers')

Route
  .put('/:id', customers.editCustomer)
  .put('/editPhoto/:id', customers.editCustomerPhoto)
  .get('/:id', customers.getCustomerById)

module.exports = Route
