const conn = require('../configs/connection')

module.exports = {
  getAll: (offset, limit, sort, sortBy, search) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM sellers WHERE (name LIKE '%${search}%') 
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

  getStoreById: (sellerId) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM sellers WHERE id='" + sellerId + "'"
      conn.query(sql, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  createStore: (data) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO sellers SET ?'
      conn.query(sql, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
          console.log(err)
        }
      })
    })
  },
  updateStore: (id, data) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE sellers SET ? WHERE id = ?'

      conn.query(sql, [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteStore: (id) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM sellers WHERE id='" + id + "'"
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
