const JWT = require('jsonwebtoken')

module.exports = {
  isAuth: (req, res, next) => {
    try {
      const { authorization, email } = req.headers
      const id = req.headers.id
      if (!authorization || !email || !id) {
        return res.status(404).json({
          status: 404,
          error: true,
          message: 'Unauthorized'
        })
      }

      const token = authorization.split(' ')[1]

      JWT.verify(token, process.env.SECRET, (err, decoded) => {
        if (err && err.name === 'JsonWebTokenError') {
          return res.status(403).json({
            status: 403,
            error: true,
            message: 'Invalid Token'
          })
        }
        if (err && err.name === 'TokenExpiredError') {
          return res.status(403).json({
            status: 403,
            error: true,
            message: 'Token Expired'
          })
        }
        if (email !== decoded.email || id !== decoded.id) {
          console.log(id)
          console.log(decoded.id)
          return res.status(403).json({
            status: 403,
            error: true,
            message: 'Your email or user id not match with token'
          })
        }
        return next()
      })
    } catch (err) {
      return res.status(401).json({
        status: 401,
        error: true,
        message: 'Token is Invalid'
      })
    }
  }
}
