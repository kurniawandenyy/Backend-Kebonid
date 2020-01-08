const model = require('../models/transactions')
const uuidv4 = require('uuid/v4')

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
          return res.status(200).json({
            data: {
              error: true,
              message: '404 Page Not Found!',
              page,
              limit,
              totalData: result.dataTotal,
              totalPage: pageTotal,
              Total: result.grandtotal,
              result: result.data
            }
          })
        } else if (page === 1 && pageTotal !== 1) {
          return res.status(200).json({
            data: {
              error: false,
              page,
              nextPage,
              limit,
              totalData: result.dataTotal,
              totalPage: pageTotal,
              Total: result.grandtotal,
              result: result.data
            }
          })
        } else if (page === pageTotal && pageTotal !== 1) {
          return res.status(200).json({
            data: {
              error: false,
              page,
              prevPage,
              limit,
              totalData: result.dataTotal,
              totalPage: pageTotal,
              Total: result.grandtotal,
              result: result.data
            }
          })
        } else if (pageTotal === 1) {
          return res.status(200).json({
            data: {
              error: false,
              page,
              limit,
              totalData: result.dataTotal,
              totalPage: pageTotal,
              Total: result.grandtotal,
              result: result.data
            }
          })
        } else {
          // return miscHelper.response(res, 200, false, 'Success', result)
          return res.status(200).json({
            data: {
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
          })
        }
      })
  },
  addTransaction: (req, res) => {
    const id = uuidv4()
    const { customerId, productId, productName, amount, price, status } = req.body
    const transactionDate = new Date()
    const data = { id, customer_id: customerId, product_id: productId, product_name: productName, amount, price, status, transaction_date: transactionDate }

    model.addTransaction(data)
      .then(result => {
        res.status(200).json({
          data: {
            error: false,
            result
          }
        })
      })
      .catch(err => {
        res.status(400).json({
          data: {
            error: true,
            err
          }
        })
      })
  },
  deleteTransaction: (req, res) => {
    const id = req.params.id

    model.deleteTransactions(id)
      .then(result => {
        res.status(200).json({
          data: {
            error: false,
            message: result
          }
        })
      })
      .catch(err => {
        res.status(400).json({
          data: {
            error: true,
            message: err
          }
        })
      })
  }

}
