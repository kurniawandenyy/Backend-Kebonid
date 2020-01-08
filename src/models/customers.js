const conn = require('../configs/connection')

module.exports = {

  createCustomer: (id, name) => {
    return new Promise((resolve, reject) => {
      const q = 'INSERT INTO customers VALUES ("'+id+'", "'+name+'", "", "", "")'
      conn.query(q, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  editCustomer: (id, name, phone, address) => {
    return new Promise((resolve, reject) => {
      const q = `UPDATE customers SET name="${name}", phone="${phone}", address="${address}" WHERE id="${id}"`
      conn.query(q, (err, result) => {
        if(!err){
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getCustomerById: (id) => {
    return new Promise((resolve, reject) => {
      const q = `SELECT * FROM customers WHERE id="${id}"`
      conn.query(q, (err, result) => {
        if(!err){
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  editCustomerPhoto: (fileName, id) => {
    const q = "UPDATE customers SET photo='" + fileName + "' WHERE id='" + id + "'"
    return new Promise((resolve, reject) => {
      conn.query(q, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
