// This logger adapts based on LOG_ENV (e.g., 'dev' or 'prod') to control log settings.
// Set LOG_ENV=dev for development or LOG_ENV=prod for production in your environment.
// Example: export LOG_ENV=dev

// Example usage of the logger:
// Use different logging levels to output messages based on the context.

// 1. Log general information about the application's operation.
// --> logger.info('Application started successfully.');

// 2. Log debugging information to trace specific code execution or variables.
// Useful during development to find and fix issues.
// --> logger.debug('Debugging application: variable x = 42');

// 3. Log warnings about potential issues that do not stop the application.
// Often used to notify about deprecations or recoverable issues.
// --> logger.warn('Memory usage is reaching the threshold.');

// 4. Log errors when an exception or critical issue occurs.
// These messages indicate something went wrong and may need attention.
// --> logger.error('Failed to connect to the database: Connection timed out');

// 5. Log verbose messages for detailed tracing, typically used in troubleshooting.
// --> logger.verbose('Detailed application lifecycle event logged');

// 6. Log the most detailed messages, often used for the most granular debugging.
// --> logger.silly('Lowest-level debug information logged');

// The output and destination of these logs depend on the LOG_ENV setting:
// - In development (LOG_ENV=dev), logs are output to the console.
// - In production (LOG_ENV=prod), logs are saved to rotating log files.

const { createLogger, format, transports } = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

const { combine, timestamp, printf, colorize } = format

const logLevel = process.env.LOG_LEVEL || 'info'
const logEnv = process.env.LOG_ENV || 'prod'

// Common log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`
})

const loggerTransports = []

// Development settings
if (logEnv === 'dev') {
  loggerTransports.push(
    new transports.Console({
      level: logLevel,
      format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
    })
  )
}

// Production settings
if (logEnv === 'prod') {
  loggerTransports.push(
    new DailyRotateFile({
      level: logLevel,
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '15d',
    })
  )
}

const logger = createLogger({
  level: logLevel,
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: loggerTransports,
})

module.exports = logger
