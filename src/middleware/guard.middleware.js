const jwt = require('jsonwebtoken')
const ResponseHandle = require('../utils/responseHandle')
const logger = require('../utils/logger')

const verifyAccessToken = (req, res, next) => {
  if (process.env.API_GUARD === 'true') {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn('Missing or invalid Authorization header')
      return ResponseHandle.error(res, 400, 'Access token is required')
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      req.user = decoded
      req.accessToken = token
      logger.info('Access token verified successfully', { userId: decoded.id })
      next()
    } catch (error) {
      logger.error('Error during token verification', { error: error.message })
      return ResponseHandle.error(res, 401, 'Invalid access token', error.message)
    }
  } else {
    logger.debug('API Guard is disabled, skipping access token verification')
    next()
  }
}

module.exports = { verifyAccessToken }
