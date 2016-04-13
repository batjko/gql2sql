import { GraphQLSchema } from 'graphql';
import Db from './db';
import { ForecastQuery, ForecastMutations } from './models/forecasts';

const Schema = new GraphQLSchema({
  query: ForecastQuery,
  mutation: ForecastMutations
});

export default Schema;
