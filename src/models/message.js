const conn = require('../configs/connection')

module.exports = {
  getMessage: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM message where sender_id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  addMessage: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('Insert Into message set ?', data, (err, result) => {
        if (!err) {
          const message = 'Message Sent'
          resolve(message)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
