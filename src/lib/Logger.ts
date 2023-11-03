import { WinstonTransport } from '@axiomhq/winston'
import {
  AxiomDataSet,
  AxiomOrgId,
  AxiomToken,
  DEFAULT_LOG_HOSTNAME,
  DEFAULT_LOG_NODE_ENV,
  DEFAULT_LOG_SERVICE,
} from '@constants/index.js'
import { arch, platform } from 'os'
import Winston, {
  LeveledLogMethod,
  Logger as WinstonLogger,
  transports as WinstonTransports,
} from 'winston'

/**
 * A Winston Transport that logs to console, with colors for success and info.
 */
const ConsoleTransport = new WinstonTransports.Console({
  format: Winston.format.combine(
    Winston.format.colorize({ colors: { success: 'green', info: 'cyan' } }),
    Winston.format.simple()
  ),
})

/**
 * Creates a new Winston transport that logs to Axiom using the given dataset, token, and org ID,
 * and returns it.
 *
 * @param dataset The Axiom Dataset to log to.
 * @param token The Axiom Token to use for authentication.
 * @param orgId The Axiom Org ID to use for logging.
 *
 * @returns A new Winston transport that logs to Axiom.
 */
function AxiomTransport(dataset: string, token: string, orgId: string) {
  return new WinstonTransport({ dataset, token, orgId })
}

// Initialize the transports array with the console transport.
const transports: Winston.transport[] = [ConsoleTransport]

// Ensure that we only log to Axiom if all required environment variables are set.
if (AxiomDataSet && AxiomOrgId && AxiomToken) {
  transports.push(AxiomTransport(AxiomDataSet, AxiomToken, AxiomOrgId))
}

/**
 * An interface for the logger that extends the Winston logger and adds a `success` method.
 */
interface Logger extends WinstonLogger {
  success: LeveledLogMethod
}

/**
 * A Winston logger that handles logging how I, _@4lch4_, prefer it be handled. It logs to the
 * console and to Axiom if the required environment variables are set.
 */
const logger: Logger = Winston.createLogger({
  defaultMeta: {
    service: process.env.LOG_SERVICE || process.env.APP_NAME || DEFAULT_LOG_SERVICE,
    nodeEnv: process.env.NODE_ENV || DEFAULT_LOG_NODE_ENV,
    hostname: process.env.HOSTNAME || DEFAULT_LOG_HOSTNAME,
    arch: arch(),
    platform: platform(),
  },
  level: process.env.LOG_LEVEL || process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  levels: { ...Winston.config.npm.levels, success: -1 },
  transports,
}) as Logger

logger.success = logger.log.bind(logger, 'success')

export { AxiomTransport, ConsoleTransport, logger }
