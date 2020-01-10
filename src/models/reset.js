const conn = require('../configs/connection')

module.exports = {

  createReset: (id, email, otp) => {
    return new Promise((resolve, reject) => {
      const data = { id, email, otp }
      conn.query('INSERT INTO reset_password SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getReset: (otp) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM reset_password WHERE otp="' + otp + '"', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteReset: (email) => {
    return new Promise((resolve, reject) => {
      const q = 'DELETE FROM reset_password WHERE email="' + email + '"'
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
