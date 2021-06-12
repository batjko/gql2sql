/* Create a couple of records in our DB, if none exist yet */

import { client } from './dbClient.js'

export async function ensureSeedData() {
  // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#upsert
  const book1 = await client.book.upsert({
    where: { id: 1 },
    update: {},
    create: {
      // TIP: the "id" field is added automatically by our prisma model.
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
  })

  const book2 = await client.book.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  })

  console.log('Seed data:\n', { book1, book2 })
}
