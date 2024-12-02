require('./config/loadEnv')

const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const specs = require('./config/swagger.config')
const logger = require('./utils/logger')
const { connectDB } = require('./config/database.config')
const { syncModels } = require('./models')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}

app.use(cors(corsOptions))
logger.info('CORS configuration applied')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
logger.info('Swagger UI mounted at /api-docs')

const routes = require('./routes')
app.use('/api', routes)
logger.info('API routes mounted at /api')

connectDB()
  .then(() => {
    logger.info('Database connected successfully')
    return syncModels()
  })
  .then(() => {
    logger.info('Database models synchronized')
  })
  .catch((error) => {
    logger.error('Database connection or synchronization failed', { error: error.stack })
    process.exit(1)
  })

process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception occurred', { error: err.stack })
  process.exit(1)
})

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled promise rejection', { reason })
  process.exit(1)
})

module.exports = app
