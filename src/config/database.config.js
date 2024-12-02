require('./loadEnv')

const { Sequelize } = require('sequelize')
const logger = require('../utils/logger')

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  timezone: '+07:00',
  logging: false,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    paranoid: false,
  },
  models: [__dirname + '/../module/**/!(*.d).{js,ts}'],
})

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    logger.error('Unable to connect to the database:', error)
  }
}

module.exports = { sequelize, connectDB }
