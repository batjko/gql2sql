/*
  Assemble GraphQL schema and the resolvers.
  Some tips on managing your schema: https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/
*/

import gql from 'graphql-tag'

import { Book, bookResolvers } from './books/index.js'
import { Poetry, poemResolvers } from './poetry/index.js'

// Root query. It gets extended in Book and Poetry.
export const Query = gql`
  type Query {
    # Placeholder, as the query type gets extended elsewhere
    hello: String
  }
`
export const Mutation = gql`
  type Mutation {
    # Placeholder, as the real mutations get added elsewhere
    _null: String
  }
`
// Combine all types
export const typeDefs = [Book, Poetry, Query, Mutation]

// Combine all resolvers
export const resolvers = {
  Query: {
    hello: () => 'World',
    ...bookResolvers.Query,
    ...poemResolvers.Query,
  },
  Mutation: {
    ...bookResolvers.Mutation,
    ...poemResolvers.Mutation,
  },
}
