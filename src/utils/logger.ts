import winston from "winston";
import path from "path";

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "blue",
  },
};

winston.addColors(customLevels.colors);

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}]: ${info.message}`
  )
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
  )
);

// Creación de la instancia del logger
export const logger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    // 1. Imprimir en consola
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || "debug",
      format: consoleFormat,
    }),
    // 2. Guardar errores en un archivo específico
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
      format: fileFormat,
      maxsize: 5242880, // 5MB max por archivo
      maxFiles: 5,
    }),
    // 3. Guardar todo el flujo (info + errores) en otro archivo
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/combined.log"),
      format: fileFormat,
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});