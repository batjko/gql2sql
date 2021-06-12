/*
Keep your resolvers in the same file as the schema definition for the fields they implement. This will allow you to reason about your code efficiently.
*/

import { gql } from 'apollo-server'
import { getBooks, getBookById } from '../../providers/booksDB/index.js'

export const Book = gql`
  type Book {
    # The unique database ID
    id: ID!
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
`

export const bookResolvers = {
  books: () => getBooks(),
  // This one extracts the "id" param from the query
  book: (_, { id }) => getBookById(id),
}
