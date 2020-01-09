const conn = require('../configs/connection')

module.exports = {
  getAll: (offset, limit, sort, sortBy, search) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM products WHERE (name LIKE '%${search}%' or seller_id LIKE '%${search}%') 
          ORDER BY ${sortBy} ${sort} LIMIT ${offset}, ${limit}`

      conn.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getProductById: (productId) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM products WHERE id='" + productId + "'"
      conn.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  createProduct: (data) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO products SET ?'
      conn.query(sql, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
          console.log(data)
        }
      })
    })
  },
  updateProduct: (id, data) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE products SET ? WHERE id = ?'

      conn.query(sql, [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM products WHERE id='" + id + "'"
      conn.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
