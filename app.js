const express = require('express')
const bodyParser = require('body-parser')
const routerNav = require('./src/index')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public/images'))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})
app.use('/api/v1', routerNav)
const port = process.env.PORT
app.listen(port, (err) => {
  if (err) throw err
  console.log(' Server is running on Port ' + port + ' . . . ')
})
