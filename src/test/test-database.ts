import type { PrismaClient } from '../generated/prisma/client.js'

export async function prepareBooksTable(prisma: PrismaClient) {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Book" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "title" TEXT NOT NULL,
      "author" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export async function resetBooks(prisma: PrismaClient) {
  await prepareBooksTable(prisma)
  await prisma.book.deleteMany()
  await prisma.book.createMany({
    data: [
      { title: 'The Awakening', author: 'Kate Chopin' },
      { title: 'City of Glass', author: 'Paul Auster' },
    ],
  })
}
