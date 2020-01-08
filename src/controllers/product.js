const uuidv4 = require('uuid/v4')
const multer = require('multer')
const productModel = require('../models/product')
const conn = require('../configs/connection')
const miscHelper = require('./respons')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/product')
  },
  filename: (req, file, cb) => {
    var filetype = ''
    if (file.mimetype === 'image/gif') {
      filetype = 'gif'
    }
    if (file.mimetype === 'image/png') {
      filetype = 'png'
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg'
    }
    cb(null, file.fieldname + '-' + Date.now() + '.' + filetype)
  }
})

// init upload multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 6 * 1024 * 1024
  }
}).single('photo')

module.exports = {

  getProduct: (req, res) => {
    const page = parseInt(req.query.page) || 1
    const search = req.query.search || ''
    const limit = req.query.limit || 10
    const sort = req.query.sort || 'DESC'
    const sortBy = req.query.sortBy || 'date_updated'
    const offset = (page - 1) * limit

    let totalDataProduct = 0
    let totalPage = 0
    let prevPage = 0
    let nextPage = 0
    conn.query(`SELECT COUNT(*) as data FROM products WHERE (name LIKE '%${search}%')`, (err, res) => {
      if (err) {
        return miscHelper.response(res, 400, true, 'Error', err)
      }
      totalDataProduct = res[0].data
      totalPage = totalDataProduct % limit === 0 ? totalDataProduct / limit : Math.floor((totalDataProduct / limit) + 1)
      prevPage = page === 1 ? 1 : page - 1
      nextPage = page === totalPage ? totalPage : page + 1
    })

    productModel.getAll(offset, limit, sort, sortBy, search)
      .then(result => {
        res.status(200).json({
          data: {
            status: 200,
            error: false,
            source: 'api',
            data: result,
            total_data: Math.ceil(totalDataProduct),
            per_page: limit,
            current_page: page,
            total_page: totalPage,
            nextLink: `${req.originalUrl.replace('page=' + page, 'page=' + nextPage)}`,
            prevLink: `${req.originalUrl.replace('page=' + page, 'page=' + prevPage)}`,
            message: 'Success getting all data'
          }
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          data: {
            status: 400,
            error: true,
            message: 'Data not Found'
          }
        })
      })
  },

  getProductById: (req, res) => {
    const productId = req.params.id
    productModel.getProductById(productId)
      .then(result => {
        res.status(200).json({
          data: {
            status: 200,
            error: false,
            dataShowed: result.length,
            data: result,
            response: 'Data loaded'
          }
        })
      })
      .catch(err => {
        res.status(400).json({
          data: {
            status: 400,
            error: true,
            message: 'Failed to get product with this ID',
            detail: err
          }
        })
      })
  },
  // create Product
  createProduct: (req, res) => {
    upload(req, res, (_err) => {
      const { sellerId, name, description, stock, price } = req.body
      const id = uuidv4() // generate new id
      const dateUpdated = new Date()
      const dateCreated = new Date()
      const photo = req.file ? `${process.env.BASE_URL}/product/${req.file.filename}` : null
      const data = { id, seller_id: sellerId, name, photo, description, stock, price, date_created: dateCreated, date_updated: dateUpdated }
      productModel.createProduct(data)
        .then(result => {
          res.status(201).json({
            data: {
              status: 201,
              err: false,
              data,
              message: 'Success add new product'
            }
          })
        })
        .catch(err => {
          res.status(400).json({
            data: {
              status: 400,
              err: true,
              message: 'failed to add new product',
              detail: err
            }
          })
        })
    })
  },

  // update Product
  updateProduct: (req, res) => {
    upload(req, res, (_err) => {
      const { name, description, stock, price } = req.body
      const dateUpdated = new Date()
      const id = req.params.id
      const photo = req.file ? `http://localhost:3000/product/${req.file.filename}` : null
      const data = { id, name, photo, description, stock, price, date_updated: dateUpdated }

      productModel.updateProduct(id, data)
        .then(result => {
          res.status(201).json({
            data: {
              status: 201,
              err: false,
              data,
              message: 'Success updated user'
            }
          })
        })
        .catch(err => {
          console.log(err)
          res.status(400).json({
            data: {
              status: 400,
              err: true,
              message: 'Failed to updated user'
            }
          })
        })
    })
  },

  // delete product
  deleteProduct: (req, res) => {
    const id = req.params.id
    productModel.deleteProduct(id)
      .then(result => {
        res.status(201).json({
          data: {
            status: 201,
            err: false,
            message: 'Product have been deleted'
          }
        })
      })
      .catch(_err => {
        res.status(400).json({
          data: {
            status: 400,
            err: true,
            message: 'Failed to deleted product'
          }
        })
      })
  }
}
