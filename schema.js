import { GraphQLSchema } from 'graphql';
import Query from './Query.js';
import Mutation from './Mutation.js';

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
