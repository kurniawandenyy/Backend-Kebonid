const authModel = require('../models/auth')
const customersModel = require('../models/customers')
const resetModel = require('../models/reset')
const JWT = require('jsonwebtoken')
const uuid = require('uuid/v4')
const nodemailer = require('nodemailer')
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const bcrypt = require('bcryptjs')
const saltRounds = 10
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
})

module.exports = {

  register: (req, res) => {
    const id = uuid()
    const { email, name } = req.body
    const isSeller = false
    const salt = bcrypt.genSaltSync(saltRounds)
    const password = bcrypt.hashSync(req.body.password, salt)
    const data = { id, email, password, is_seller: isSeller }
    const checkEmail = emailRegex.test(email)

    if (checkEmail === true) {
      authModel.register(data)
        .then(result => {
          customersModel.createCustomer(id, name)
            .then(result => {
              res.status(200).json({
                status: 200,
                error: false,
                user: {
                  id,
                  name,
                  email,
                  isSeller
                },
                detail: result,
                message: 'Successfully Register New User'
              })
            })
            .catch(err => {
              console.log(err)
              res.status(400).json({
                status: 400,
                error: true,
                message: 'Error',
                detail: err
              })
            })
        })
        .catch(err => {
          res.status(400).json({
            status: 400,
            error: true,
            message: 'Email is already registered',
            detail: err
          })
        })
    } else {
      res.status(400).json({
        status: 400,
        error: true,
        message: 'Email not valid'
      })
    }
  },

  login: (req, res) => {
    const email = req.body.email
    const password = req.body.password

    authModel.getPassword(email)
      .then(result => {
        const hash = result[0].password
        const checkPass = bcrypt.compareSync(password, hash)
        if (checkPass === true) {
          authModel.getUser(email, hash)
            .then(result => {
              result = result[0]
              if (result) {
                const id = result.id
                const email = result.email
                const isSeller = result.isSeller
                const token = JWT.sign({ id, email, isSeller }, process.env.SECRET, { expiresIn: '12h' })

                res.status(201).json({
                  status: 201,
                  message: 'Success login',
                  token,
                  user: { id, email, isSeller },
                  detail: 'This token only valid for 12 hour'
                })
              } else {
                res.status(400).json({
                  status: 400,
                  error: true,
                  message: 'Email or Password incorect'
                })
              }
            })
            .catch(err => {
              res.status(400).json({
                status: 400,
                error: true,
                message: 'Login Failed',
                detail: err
              })
            })
        } else {
          res.status(400).json({
            status: 400,
            error: true,
            message: 'Wrong Password'
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(404).json({
          status: 404,
          error: true,
          message: 'Account not found'
        })
      })
  },

  forgot: (req, res) => {
    const email = req.body.email
    function getRndInteger (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    authModel.getEmail(email)
      .then(result => {
        if (result[0]) {
          const otp = getRndInteger(1000, 9999)
          const id = uuid()
          resetModel.createReset(id, email, otp)
            .then(result_ => {
              const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'RESET PASSWORD',
                text: 'Here your OTP : ' + otp
              }
              transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                  console.log(err)
                  res.send('email failed')
                } else {
                  res.status(200).json({
                    status: 200,
                    error: false,
                    message: 'Successfully send email',
                    mailOptions
                  })
                }
              })
            })
            .catch(err_ => {
              res.status(404).json({
                message: 'error '
              })
            })
        } else {
          console.log('email not found')
          res.status(404).json({
            message: 'Email not found'
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(404).json({
          status: 404,
          error: true,
          message: 'Account not found'
        })
      })
  },

  reset: (req, res) => {
    const otp = req.body.otp
    const salt = bcrypt.genSaltSync(saltRounds)
    const password = bcrypt.hashSync(req.body.password, salt)
    resetModel.getReset(otp)
      .then(result => {
        if (result[0]) {
          authModel.changePassword(result[0].email, password)
            .then(result_ => {
              resetModel.deleteReset(result[0].email)
                .then(_result => {
                  res.status(200).json({
                    message: 'Success reset password'
                  })
                    .catch(_err => {
                      res.status(200).json({
                        message: 'failed reset password'
                      })
                    })
                })
            })
        } else {
          res.status(400).json({
            message: 'NOT OK'
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          message: 'Not Ok'
        })
      })
  },
  
  update: (req, res) => {
    const { isSeller, id } = req.body
    authModel.update(id, isSeller)
      .then(result => {
        res.status(200).json({
          message: 'Success update user',
          result
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'Failed update user',
          err
        })
      })
  }
}
