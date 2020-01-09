const multer = require('multer')
const storeModel = require('../models/store')
const conn = require('../configs/connection')
const miscHelper = require('./respons')
const redis = require('redis')
const redisClient = redis.createClient()
require('dotenv').config()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/store')
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

  getStore: (req, res) => {
    const page = parseInt(req.query.page) || 1
    const search = req.query.search || ''
    const limit = req.query.limit || 10
    const sort = req.query.sort || 'DESC'
    const sortBy = req.query.sortBy || 'name'
    const offset = (page - 1) * limit

    let totalDataStore = 0
    let totalPage = 0
    let prevPage = 0
    let nextPage = 0
    conn.query(`SELECT COUNT(*) as data FROM sellers WHERE (name LIKE '%${search}%')`, (err, res) => {
      if (err) {
        return miscHelper.response(res, 400, true, 'Error', err)
      }
      totalDataStore = res[0].data
      totalPage = totalDataStore % limit === 0 ? totalDataStore / limit : Math.floor((totalDataStore / limit) + 1)
      prevPage = page === 1 ? 1 : page - 1
      nextPage = page === totalPage ? totalPage : page + 1
    })

    storeModel.getAll(offset, limit, sort, sortBy, search)
      .then(result => {
        const data = {
          status: 200,
          error: false,
          source: 'api',
          data: result,
          total_data: Math.ceil(totalDataStore),
          per_page: limit,
          current_page: page,
          total_page: totalPage,
          nextLink: process.env.BASE_URL + req.originalUrl.replace('page=' + page, 'page=' + nextPage),
          prevLink: process.env.BASE_URL + req.originalUrl.replace('page=' + page, 'page=' + prevPage),
          message: 'Success getting all data'
        }
        redisClient.setex(req.originalUrl, 3600, JSON.stringify(data))
        res.status(200).json({
          data
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          status: 400,
          error: true,
          message: 'Data not Found'
        })
      })
  },

  getStoreById: (req, res) => {
    const storeId = req.params.id
    storeModel.getStoreById(storeId)
      .then(result => {
        redisClient.flushdb()
        res.status(200).json({
          status: 200,
          error: false,
          dataShowed: result.length,
          data: result,
          response: 'Data loaded'
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          status: 400,
          error: true,
          message: 'Failed to get store with this ID',
          detail: err
        })
      })
  },
  // create Store
  createStore: (req, res) => {
    upload(req, res, (_err) => {
      const { id, name, phone, address } = req.body
      const photo = req.file ? req.file.filename : null
      const data = { id, name, photo, phone, address }
      storeModel.createStore(data)
        .then(result => {
          redisClient.flushdb()
          res.status(201).json({
            status: 201,
            err: false,
            data,
            message: 'Success add new store'
          })
        })
        .catch(err => {
          res.status(400).json({
            status: 400,
            err: true,
            message: 'failed to add new store',
            detail: err
          })
        })
    })
  },

  // update store
  updateStore: (req, res) => {
    upload(req, res, (_err) => {
      const { name, phone, address } = req.body
      const id = req.params.id
      const photo = req.file ? req.file.filename : null
      const data = { id, name, photo, phone, address }

      storeModel.updateStore(id, data)
        .then(result => {
          redisClient.flushdb()
          res.status(201).json({
            status: 201,
            err: false,
            data,
            message: 'Success updated user'
          })
        })
        .catch(err => {
          console.log(err)
          res.status(400).json({
            status: 400,
            err: true,
            message: 'Failed to updated user'
          })
        })
    })
  },

  // delete store
  deleteStore: (req, res) => {
    const id = req.params.id
    storeModel.deleteStore(id)
      .then(result => {
        redisClient.flushdb()
        res.status(201).json({
          status: 201,
          err: false,
          message: 'Store have been deleted'
        })
      })
      .catch(_err => {
        res.status(400).json({
          status: 400,
          err: true,
          message: 'Failed to deleted store'
        })
      })
  }
}
