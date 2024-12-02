const axios = require('axios')
const ResponseHandle = require('../utils/responseHandle')
const logger = require('../utils/logger')

const verifyAccessToken = async (req, res, next) => {
  if (process.env.API_GUARD === 'true') {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn('Missing or invalid Authorization header')
      return ResponseHandle.error(res, 400, 'Access token is required')
    }

    const accessToken = authHeader.split(' ')[1]

    try {
      const { data: response } = await axios.post(
        `${process.env.IDP_PROVIDER_URL}/api/auth/tokens/verify`,
        {
          token: accessToken,
        }
      )

      if (response && response.status === 'success') {
        req.user = response.data
        req.accessToken = accessToken
        logger.info('Access token verified successfully', { userId: response.data.id })
        next()
      } else {
        logger.warn('Access token verification failed', { response })
        return ResponseHandle.error(
          res,
          401,
          response.message || 'Access token verification failed'
        )
      }
    } catch (error) {
      logger.error('Error during access token verification', { error: error.message })
      return ResponseHandle.error(res, 401, 'Invalid access token', error)
    }
  } else {
    logger.debug('API Guard is disabled, skipping access token verification')
    next()
  }
}

module.exports = { verifyAccessToken }
