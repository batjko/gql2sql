/*
  Assemble GraphQL schema and the resolvers.
  Some tips on managing your schema: https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/
*/

import { gql } from 'apollo-server'

import { Book, bookResolvers } from './books/index.js'
import { Poetry, poemResolvers } from './poetry/index.js'

// Root query. It gets extended in Book and Poetry.
const Query = gql`
  type Query {
    # Placeholder, as the query type gets extended elsewhere
    hello: String
  }
`
// Combine all types
export const typeDefs = [Book, Poetry, Query]

// Combine all resolvers
export const resolvers = {
  Query: {
    hello: () => 'World',
    ...bookResolvers,
    ...poemResolvers,
  },
}
