import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import express from 'express'

import type { AppEnv } from './config/env.js'
import type { Logger } from './config/logger.js'
import type { PrismaClient } from './generated/prisma/client.js'
import { loadTypeDefs } from './graphql/load-schema.js'
import { resolvers } from './graphql/resolvers/index.js'
import { PoetryClient } from './services/poetry/poetry-client.js'

export interface AppDependencies {
  env: AppEnv
  logger: Logger
  prisma: PrismaClient
}

export async function createApp(dependencies: AppDependencies) {
  const app = express()
  const apollo = new ApolloServer({
    typeDefs: loadTypeDefs(),
    resolvers,
  })

  const poetryClient = new PoetryClient({
    baseUrl: dependencies.env.POETRY_API_BASE_URL,
    timeoutMs: dependencies.env.REQUEST_TIMEOUT_MS,
  })

  await apollo.start()

  app.disable('x-powered-by')
  app.use(express.json())

  app.get('/healthz', (_request, response) => {
    response.status(200).json({ status: 'ok' })
  })

  app.use(
    '/graphql',
    expressMiddleware(apollo, {
      context: async () => ({
        logger: dependencies.logger,
        prisma: dependencies.prisma,
        poetryClient,
      }),
    }),
  )

  return { app, apollo }
}
