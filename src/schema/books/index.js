/*
Keep your resolvers in the same file as the schema definition for the fields they implement. This will allow you to reason about your code efficiently.
*/

import gql from 'graphql-tag'
import {
  getBooks,
  getBookById,
  addBook,
} from '../../providers/booksDB/index.js'

export const Book = gql`
  type Book {
    # The unique database ID
    id: ID
    # The title of the book
    title: String
    # Guess what: It's who wrote the book!
    author: String
  }

  extend type Query {
    # Get all books
    books: [Book]

    # Get one book by its database ID
    book(id: ID!): Book
  }

  extend type Mutation {
    # Create a new book in DB and then return it
    addBook(title: String, author: String): Book
  }
`

export const bookResolvers = {
  Query: {
    books: () => getBooks(),
    // This one extracts the "id" param from the query
    book: (_, { id }) => getBookById(id),
  },
  Mutation: {
    addBook: async (_, { title, author }) => {
      const book = { title, author }
      return await addBook(book)
    },
  },
}
