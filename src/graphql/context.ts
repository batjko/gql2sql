import type { Logger } from '../config/logger.js'
import type { PrismaClient } from '../generated/prisma/client.js'
import type { PoetryClient } from '../services/poetry/poetry-client.js'

export interface GraphQLContext {
  prisma: PrismaClient
  logger: Logger
  poetryClient: PoetryClient
}
