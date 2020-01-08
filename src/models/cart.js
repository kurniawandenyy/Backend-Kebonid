const conn = require('../configs/connection')

module.exports = {

  createCart: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO cart SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  
  getCart: (customerId) => {
    return new Promise((resolve, reject) => {
      const q = `SELECT *, (amount*price) as sub_total FROM cart WHERE customer_id="${customerId}"`
      conn.query(q, (err, res) => {
        if (!err) {
          conn.query(`SELECT sum(amount*price) as total FROM cart where customer_id= "${customerId}"`, (err, total) => {
            if (err) {
              reject(new Error(err))
            } else {
              const result = { res, total }
              resolve(result)
            }
          })
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteCart: (customerId) => {
    return new Promise((resolve, reject) => {
      const q = 'DELETE FROM cart WHERE id="'+customerId+'"'
      conn.query(q, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
}
