import { loadEnv } from '../src/config/env.js'
import { createPrismaClient } from '../src/data/prisma/client.js'

async function main() {
  const env = loadEnv()
  const prisma = createPrismaClient(env.DATABASE_URL)

  const count = await prisma.book.count()

  if (count > 0) {
    console.info(`Database already has ${count} books.`)
    await prisma.$disconnect()
    return
  }

  await prisma.book.createMany({
    data: [
      { title: 'The Awakening', author: 'Kate Chopin' },
      { title: 'City of Glass', author: 'Paul Auster' },
    ],
  })

  console.info('Seeded 2 books into the SQLite database.')
  await prisma.$disconnect()
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
