import { createApp } from './app.js'
import { loadEnv } from './config/env.js'
import { createLogger } from './config/logger.js'
import { createPrismaClient } from './data/prisma/client.js'

async function main() {
  const env = loadEnv()
  const logger = createLogger()
  const prisma = createPrismaClient(env.DATABASE_URL)
  const { app, apollo } = await createApp({ env, logger, prisma })

  const server = app.listen(env.PORT, () => {
    logger.info(`GraphQL server ready at http://localhost:${env.PORT}/graphql`)
  })

  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}, shutting down...`)
    server.close(async (error?: Error) => {
      if (error) {
        logger.error('HTTP server failed to close cleanly.', error)
      }

      await apollo.stop()
      await prisma.$disconnect()

      process.exit(error ? 1 : 0)
    })
  }

  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.on(signal, () => {
      void shutdown(signal)
    })
  }
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
