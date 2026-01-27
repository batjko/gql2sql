import { server } from './src/server.js'
import { startStandaloneServer } from '@apollo/server/standalone'
import { ensureSeedData } from './src/providers/booksDB/index.js'

// launch the server
const { url } = await startStandaloneServer(server, {
  listen: { port: parseInt(process.env.PORT) || 3000 }
})

// ensure that some seed data exists (e.g. on first launch)
await ensureSeedData()

console.info(`Server started at ${url}...`)
