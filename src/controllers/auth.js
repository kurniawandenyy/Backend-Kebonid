const authModel = require('../models/auth')
const userModel = require('../models/customers')
const JWT = require('jsonwebtoken')
const uuid = require('uuid/v4')
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const bcrypt = require('bcryptjs')
const saltRounds = 10

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
          userModel.createCustomer(id, name)
            .then(result => {
              res.status(200).json({
                data: {
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
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(400).json({
                data: {
                  status: 400,
                  error: true,
                  message: 'Error',
                  detail: err
                }
              })
            })
        })
        .catch(err => {
          res.status(400).json({
            data: {
              status: 400,
              error: true,
              message: 'Email is already registered',
              detail: err
            }
          })
        })
    } else {
      res.status(400).json({
        data: {
          status: 400,
          error: true,
          message: 'Email not valid'
        }
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
                const isSeller = result.is_seller
                const token = JWT.sign({ id, email, isSeller }, process.env.SECRET, { expiresIn: '12h' })

                res.status(201).json({
                  data: {
                    status: 201,
                    message: 'Success login',
                    token,
                    user: { id, email, isSeller },
                    detail: 'This token only valid for 12 hour'
                  }
                })
              } else {
                res.status(400).json({
                  data: {
                    status: 400,
                    error: true,
                    message: 'Email or Password incorect'
                  }
                })
              }
            })
            .catch(err => {
              res.status(400).json({
                data: {
                  status: 400,
                  error: true,
                  message: 'Login Failed',
                  detail: err
                }
              })
            })
        } else {
          res.status(400).json({
            data: {
              status: 400,
              error: true,
              message: 'Wrong Password'
            }
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(404).json({
          data: {
            status: 404,
            error: true,
            message: 'Account not found'
          }
        })
      })
  }
}
