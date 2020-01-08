const customersModel = require('../models/customers')
const multer = require('multer')

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/customers')
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname)
  }
})

const filter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(new Error('File format should be PNG, JPG, or JPEG'))
  }
}

const upload = multer({ storage: fileStorage, fileFilter: filter, limits: { fileSize: 6000000 } })

module.exports = {

  editCustomer: (req, res) => {
    const id = req.params.id
    const { name, phone, address } = req.body
    customersModel.editCustomer(id, name, phone, address)
    .then(result => {
      res.status(200).json({
        data: {
          id,
          name,
          phone,
          address,
          message: 'Successfuly Edit a Customers'
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({
        data: {
          status: 400,
          error: true,
          message: 'Email or Password incorect'
        }
      })
    })
  },

  getCustomerById: (req, res) => {
    const id = req.params.id
    customersModel.getCustomerById(id)
    .then(result => {
      res.status(200).json({
        data: {
          result,
          message: 'Successfuly get data Customers by id'
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({
        data: {
          status: 400,
          error: true,
          message: 'Error get data Customers by id'
        }
      })
    })
  },

  editCustomerPhoto: [upload.single('file'), (req, res) => {
    const fileName = req.file.filename
    const id = req.params.id
    customersModel.editCustomerPhoto(fileName, id)
      .then(result => {
        res.status(200).json({
          data: {
            status: 200,
            error: false,
            data: result,
            message: 'Successfully update data'
          }
        })
      })
      .catch(err => {
        res.status(400).json({
          data: {
            status: 400,
            error: true,
            message: 'Error update data'
          }
        })
      })
  }]
}