const conn = require('../configs/connection')

module.exports = {

  createWishlist: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO wishlist SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getWishlist: (customerId) => {
    return new Promise((resolve, reject) => {
      const q = 'SELECT wishlist.id, products.id as product_id, wishlist.customer_id, products.seller_id, products.name, products.photo, products.description, products.stock, products.price FROM wishlist INNER JOIN products ON wishlist.product_id = products.id WHERE customer_id="'+customerId+'"'
      conn.query(q, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getAllWishlist: () => {
    return new Promise((resolve, reject) => {
      const q = 'SELECT wishlist.id, wishlist.customer_id, products.seller_id, products.name, products.photo, products.description, products.stock, products.price FROM wishlist INNER JOIN products ON wishlist.product_id = products.id'
      conn.query(q, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteWishlist: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM wishlist WHERE id="' + id + '"', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
