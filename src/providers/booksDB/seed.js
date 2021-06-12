/* Create a couple of records in our DB, if none exist yet */

import { client } from './dbClient.js'

export async function ensureSeedData() {
  const count = await client.book.count()

  if (count === 0) {
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#upsert
    const book1 = await client.book.create({
      data: {
        // TIP: the "id" field is added automatically by our prisma model.
        title: 'The Awakening',
        author: 'Kate Chopin',
      },
    })

    const book2 = await client.book.create({
      data: {
        title: 'City of Glass',
        author: 'Paul Auster',
      },
    })
    console.log('Seed data:\n', { book1, book2 })
  } else {
    console.log(`Database already has ${count} records.`)
  }
}

// truncate table
export async function clean() {
  const { count } = await client.book.deleteMany()

  console.log(`Deleted ${count} records.`)
}
