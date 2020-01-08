const conn = require('../configs/connection')

module.exports = {
  getTransactions: (limit, offset, condition, custId) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT COUNT(*) as data from transaction ${condition}`, (err, rows) => {
        if (err) {
          reject(new Error(err))
        } else {
          const dataTotal = rows[0].data
          conn.query(`SELECT *, (amount*price) as sub_total FROM transaction ${condition} limit ${offset}, ${limit}`, (err, data) => {
            if (!err) {
              conn.query(`SELECT sum(amount*price) as total, transaction_date FROM transaction where customer_id= '${custId}' GROUP by transaction_date`, (err, total) => {
                if (err) {
                  reject(new Error(err))
                } else {
                  const grandtotal = total
                  const result = { dataTotal, data, grandtotal }
                  resolve(result)
                }
              })
            } else {
              reject(new Error(err))
            }
          })
        }
      })
    })
  },
  addTransaction: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO transaction SET ?', data, (err, result) => {
        if (!err) {
          const message = 'Data Added Successfully'
          resolve(message)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteTransactions: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM transaction where id = ?', id, (err) => {
        if (!err) {
          const message = 'Data Deleted Successfully'
          resolve(message)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
