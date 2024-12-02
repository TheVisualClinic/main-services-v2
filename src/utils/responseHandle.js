const logger = require('./logger')

class ResponseHandle {
  static sendResponse(res, statusCode, status, message, data = null, error = null) {
    res.status(statusCode).json({
      status,
      message,
      data: data || undefined,
      error: error ? (error instanceof Error ? error.message : error) : undefined,
    })
  }

  static success(res, data = null, message = 'Success') {
    this.sendResponse(res, 200, 'success', message, data)
  }

  static created(res, data = null, message = 'Resource created successfully') {
    this.sendResponse(res, 201, 'success', message, data)
  }

  static error(res, statusCode, message, error = null, req = null) {
    const errorDetails = {
      statusCode,
      message,
      error: error instanceof Error ? error.stack : error,
      endpoint: req ? req.originalUrl : undefined,
      method: req ? req.method : undefined,
      params: req ? req.params : undefined,
      body: req ? req.body : undefined,
    }

    if (statusCode >= 500) {
      logger.error(`Server Error: ${message}`, errorDetails)
    } else {
      logger.warn(`Client Error: ${message}`, errorDetails)
    }

    this.sendResponse(
      res,
      statusCode,
      statusCode >= 500 ? 'error' : 'fail',
      message,
      null,
      errorDetails.error
    )
  }
}

module.exports = ResponseHandle
