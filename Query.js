import {
  GraphQLObjectType,
  GraphQLList
} from 'graphql';

import { ForecastModel, ForecastType, ForecastArgs } from './models/forecasts';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'This is our Forecast query',
  fields: () => {
    return {
      forecasts: {
        type: new GraphQLList(ForecastType),
        args: ForecastArgs,
        resolve(root, args) {
          const hasChanged = args.hasChanged;
          delete args.hasChanged;

          const opts = { where: args };
          opts.where.hasChanged = hasChanged ? 1 : 0;

          return ForecastModel.findAll(opts);
        }
      }
    }
  }
});
