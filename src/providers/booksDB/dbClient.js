import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

// Create SQLite adapter for Prisma 7
const adapter = new PrismaBetterSqlite3({
  url: 'file:./prisma/dev.db'
})

// Re-import this client everywhere you need to access prisma, instead of re-creating new instances.
export const client = new PrismaClient({ adapter })
