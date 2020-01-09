const wishlistModel = require('../models/wishlist')
const uuid = require('uuid/v4')

module.exports = {

  createWishlist: (req, res) => {
    const id = uuid()
    const { customerId, productId } = req.body
    const data = {id, customer_id: customerId, product_id: productId}
    wishlistModel.createWishlist(data)
    .then(result => {
      res.status(200).json({
        data: {
          status: 200,
          error: false,
          result,
          wishlist : {
            id,
            customerId,
            productId
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
          message: 'Error create wishlist'
        }
      })
    })
  },

  getWishlist: (req, res) => {
    wishlistModel.getWishlist(req.params.id)
    .then(result => {
      res.status(200).json({
        data: {
          result,
          message: 'Successfully get wishlist'
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({
        data: {
          status: 400,
          error: true,
          message: 'Error get wishlist'
        }
      })
    })
  },

  deleteWishlist: (req, res) => {
    wishlistModel.deleteWishlist(req.params.id)
    .then(result => {
      res.status(200).json({
        data: {
          result,
          message: 'Successfully Delete Wishlist'
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({
        data: {
          status: 400,
          error: true,
          message: 'Error delete wishlist'
        }
      })
    })
  }
}
