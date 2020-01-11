const model = require('../models/message')
const uuidv4 = require('uuid/v4')

module.exports = {
  getMessage: (req, res) => {
    const id = req.params.id
    model.getMessage(id)
      .then(result => {
        return res.status(200).json({
          error: false,
          result
        })
      })
      .catch(err => {
        return res.status(400).json({
          error: true,
          err
        })
      })
  },
  addMessage: (req, res) => {
    const id = uuidv4()
    const { senderId, receiverId, message } = req.body
    const date = new Date()
    const data = { id, sender_id: senderId, receiver_id: receiverId, message, date }

    model.addMessage(data)
      .then(result => {
        return res.status(200).json({
          error: false,
          result
        })
      })
      .catch(err => {
        return res.status(400).json({
          error: true,
          err
        })
      })
  }
}
