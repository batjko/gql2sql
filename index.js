import { server } from './src/server.js'
import { ensureSeedData } from './src/providers/booksDB/index.js'

// launch the server
const { url } = await server.listen(process.env.PORT || 3000)

// ensure that some seed data exists (e.g. on first launch)
try {
  await ensureSeedData()
} catch (error) {
  throw error
}

console.info(`Server started at ${url}...`)
