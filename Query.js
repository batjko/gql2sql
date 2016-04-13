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
          const opts = { where: args };

          if (args.hasOwnProperty("hasChanged")) {
            const hasChanged = args.hasChanged;
            delete args.hasChanged;
            opts.where.hasChanged = hasChanged ? 1 : 0;
          }
          return ForecastModel.findAll(opts);
        }
      }
    }
  }
});
