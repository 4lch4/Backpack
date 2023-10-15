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
import Winston, { transports as WinstonTransports } from 'winston'

export const ConsoleTransport = new WinstonTransports.Console({
  format: Winston.format.combine(
    Winston.format.colorize({ colors: { success: 'green', info: 'cyan' } }),
    Winston.format.simple()
  ),
})

export function AxiomTransport(dataset: string, token: string, orgId: string) {
  return new WinstonTransport({ dataset, token, orgId })
}

const transports: Winston.transport[] = [ConsoleTransport]

// Ensure that we only log to Axiom if all required environment variables are set.
if (AxiomDataSet && AxiomOrgId && AxiomToken) {
  transports.push(AxiomTransport(AxiomDataSet, AxiomToken, AxiomOrgId))
}

export const logger = Winston.createLogger({
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
})
