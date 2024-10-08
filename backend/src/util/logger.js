const config = require("config");
const env = require("dotenv");
const winston = require("winston");
const { format } = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, json, colorize } = format;

env.config();

const LOG_LEVEL = config.get("logger.level");

const consoleLogFormat = format.combine(
  format.json(),
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${timestamp} - ${level}: ${message}`;
  })
);

const fileLogFormat = format.combine(
  format.printf(({ level, message, timestamp }) => {
    return `${timestamp} - ${level}: ${message}`;
  })
);

const fileTransport = new winston.transports.DailyRotateFile({
  level: LOG_LEVEL,
  filename: "./../logs/app-%DATE%.log",
  datePattern: "HH-DD-MM-YYYY",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  format: fileLogFormat,
});

// Create a Winston logger
const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: combine(timestamp(), format.splat(), format.simple(), json()),
  transports: [
    new winston.transports.Console({
      format: consoleLogFormat,
    }),
    fileTransport,
  ],
});

module.exports = logger;
