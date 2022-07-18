
import * as winston from 'winston';


import { createLogger, transports, format } from "winston";


const withDebugMode: boolean = !(!process.env.DEBUG); // when not debugging, log requests as one-liners

// here we are preparing the winston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const eruptionBotLogger = createLogger({
    defaultMeta: withDebugMode, // when not debugging, log requests as one-liners
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    )/* ,

    format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
    }) */
});
eruptionBotLogger.info(`Eruption Bot Logger initialized!`)
export default eruptionBotLogger;


