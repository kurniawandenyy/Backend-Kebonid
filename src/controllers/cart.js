const cartModel = require('../models/cart')
const uuid = require('uuid/v4')

module.exports = {

  createCart: (req, res) => {
    const id = uuid()
    const { customerId, productId, productName, amount, price } = req.body
    const data = {id, customer_id: customerId, product_id: productId, product_name: productName, amount, price}
    cartModel.createCart(data)
    .then(result => {
      res.status(200).json({
        data: {
          status: 200,
          error: false,
          result,
          cart : {
            id,
            customerId,
            productId,
            productName,
            amount,
            price,
          }
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({
        data: {
          status: 400,
          error: true,
          message: 'Error create cart'
        }
      })
    })
  },

  getCart: (req, res) => {
    cartModel.getCart(req.params.id)
    .then(result => {
      res.status(200).json({
        data: {
          items: result.res,
          totalPrice: result.total[0].total
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({
        data: {
          status: 400,
          error: true,
          message: 'Error get cart'
        }
      })
    })
  },

  deleteCart: (req, res) => {
    cartModel.deleteCart(req.params.id)
    .then(result => {
      res.status(200).json({
        data: {
          result,
          message: 'Successfully delete cart'
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({
        data:{
          message: 'Error delete cart'
        }
      })
    })
  }
}
