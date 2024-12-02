const app = require('./app')
const logger = require('./utils/logger')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`)
  if (process.env.NODE_ENV !== 'production') {
    logger.debug(`Swagger documentation is available at http://localhost:${PORT}/api-docs`)
  }
})
