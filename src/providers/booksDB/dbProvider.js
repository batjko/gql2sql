/* This is where you connect to your backend database. */

import { client } from './dbClient.js'

/*
  GraphQL passes through any errors thrown by the resolvers that use these providers.
  Use try/catch here, in order to control the errors being sent back to the GraphQL client.
*/
export async function getBooks() {
  let books

  try {
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findmany
    books = await client.book.findMany()
  } catch (error) {
    console.error(error)
    throw new Error(`Internal DB error: Unable to query DB for Books`)
  } finally {
    await client.$disconnect()
  }

  return books
}

export async function getBookById(id) {
  let book

  try {
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findunique
    book = await client.book.findUnique({
      where: { id: Number(id) },
    })
  } catch (error) {
    console.error(error)
    throw new Error(`Internal DB error: Unable to query DB for Book ${id}`)
  } finally {
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#disconnect-1
    await client.$disconnect()
  }

  return book
}
