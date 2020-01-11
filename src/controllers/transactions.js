const model = require('../models/transactions')
const uuidv4 = require('uuid/v4')
const redis = require('redis')
const redisClient = redis.createClient()

module.exports = {
  getTransactions: (req, res) => {
    const custId = parseInt(req.params.id) || 1
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    const sort = req.query.sort || 'product_name'
    const order = req.query.order || 'asc'
    const condition = 'where customer_id=' + custId + ' order by ' + sort + ' ' + order
    const url = req.originalUrl

    const nextPage = process.env.BASE_URL + url.replace(`page=${page}`, 'page=' + parseInt(page + 1))
    const prevPage = process.env.BASE_URL + url.replace(`page=${page}`, 'page=' + parseInt(page - 1))

    model.getTransactions(limit, offset, condition, custId)
      .then(result => {
        const pageTotal = result.dataTotal % limit === 0 ? result.dataTotal / limit : Math.floor((result.dataTotal / limit) + 1)
        if (page > pageTotal || page === 0) {
          const data = {
            error: true,
            message: '404 Page Not Found!',
            page,
            limit,
            totalData: result.dataTotal,
            totalPage: pageTotal,
            Total: result.grandtotal,
            result: result.data
          }
          redisClient.setex(req.originalUrl, 3600, JSON.stringify(data))
          return res.status(200).json({
            error: true,
            message: '404 Page Not Found!',
            page,
            limit,
            totalData: result.dataTotal,
            totalPage: pageTotal,
            Total: result.grandtotal,
            result: result.data
          })
        } else if (page === 1 && pageTotal !== 1) {
          const data = {
            error: false,
            page,
            nextPage,
            limit,
            totalData: result.dataTotal,
            totalPage: pageTotal,
            Total: result.grandtotal,
            result: result.data
          }
          redisClient.setex(req.originalUrl, 3600, JSON.stringify(data))
          return res.status(200).json({
            error: false,
            page,
            nextPage,
            limit,
            totalData: result.dataTotal,
            totalPage: pageTotal,
            Total: result.grandtotal,
            result: result.data
          })
        } else if (page === pageTotal && pageTotal !== 1) {
          const data = {
            error: false,
            page,
            prevPage,
            limit,
            totalData: result.dataTotal,
            totalPage: pageTotal,
            Total: result.grandtotal,
            result: result.data
          }
          redisClient.setex(req.originalUrl, 3600, JSON.stringify(data))
          return res.status(200).json({
            error: false,
            page,
            prevPage,
            limit,
            totalData: result.dataTotal,
            totalPage: pageTotal,
            Total: result.grandtotal,
            result: result.data
          })
        } else if (pageTotal === 1) {
          const data = {
            error: false,
            page,
            limit,
            totalData: result.dataTotal,
            totalPage: pageTotal,
            Total: result.grandtotal,
            result: result.data
          }
          redisClient.setex(req.originalUrl, 3600, JSON.stringify(data))
          return res.status(200).json({
            error: false,
            page,
            limit,
            totalData: result.dataTotal,
            totalPage: pageTotal,
            Total: result.grandtotal,
            result: result.data
          })
        } else {
          // return miscHelper.response(res, 200, false, 'Success', result)
          const data = {
            error: false,
            page,
            nextPage,
            prevPage,
            limit,
            totalData: result.dataTotal,
            totalPage: pageTotal,
            Total: result.grandtotal,
            result: result.data
          }
          redisClient.setex(req.originalUrl, 3600, JSON.stringify(data))
          return res.status(200).json({
            error: false,
            page,
            nextPage,
            prevPage,
            limit,
            totalData: result.dataTotal,
            totalPage: pageTotal,
            Total: result.grandtotal,
            result: result.data
          })
        }
      })
  },

  getLatestTransactions: (req, res) => {
    const id = req.params.id
    model.getLatestTransactions(id)
      .then(result => {
        console.log(result)
          res.status(200).json({
            error: false,
            totalData: result.dataTotal,
            Total: result.grandtotal,
            result: result.data
          })
        })
      .catch(err => {
        res.status(400).json({
          error: true,
          err: err.message
        })
      })
  },

  addTransaction: (req, res) => {
    const transactionDate = new Date()
    const idGroup = uuidv4()
    req.body.map(data => {
      console.log(data.amount)
      const id = uuidv4()
      const d = { id, customer_id: data.customerId, product_id: data.productId, product_name: data.productName, amount: data.amount, price: data.price, status: data.status, transaction_date: transactionDate, group_id: idGroup }
      model.addTransaction(d)
    })
      redisClient.flushdb()
      res.status(200).json({
        error: false,
        message: "Sucessfully add new transaction"
      })
  },

  deleteTransaction: (req, res) => {
    const id = req.params.id

    model.deleteTransactions(id)
      .then(result => {
        redisClient.flushdb()
        res.status(200).json({
          error: false,
          message: result
        })
      })
      .catch(err => {
        res.status(400).json({
          error: true,
          message: err
        })
      })
  }
}
