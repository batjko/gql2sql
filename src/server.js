/* Assembles the Apollo GraphQL server from our schema and the resolvers. */

import { ApolloServer } from '@apollo/server'
import { typeDefs, resolvers } from './schema/index.js'

export const server = new ApolloServer({
  typeDefs,
  resolvers,
})
