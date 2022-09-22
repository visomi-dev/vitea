import { createLogger, level, transports } from 'winston';

const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';

export const logger = createLogger({
  level: LOG_LEVEL as typeof level,
  transports: [new transports.Console()],
});
