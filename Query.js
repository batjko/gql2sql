import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList
} from 'graphql';

import { ForecastModel, ForecastType } from './models/forecasts';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'This is our Forecast query',
  fields: () => {
    return {
      forecasts: {
        type: new GraphQLList(ForecastType),
        args: {
          id: {type: GraphQLInt, description: 'SQL ID to correlate the forecast with Findur USER table'},
          bunit: {type: GraphQLString, description: 'Short_Name of the business unit'},
          party_id: {type: GraphQLInt, description: 'Unused'},
          portfolio: {type: GraphQLString, description: 'Unused'},
          season: {type: GraphQLString, description: 'Season, e.g. W16'},
          currency: {type: GraphQLString, description: 'Currency of the Forecast Amount'},
          position: {type: GraphQLFloat, description: 'Forecast Amount'},
          settle_date: {type: GraphQLString, description: ''},
          reference: {type: GraphQLString, description: 'Free-format Reference field'},
          status: {type: GraphQLString, description: 'Initially "New", gets updated by Findur'},
          tran_num: {type: GraphQLInt, description: 'Once booked in Findur, a transaction number gets assigned'},
          mongo_id: {type: GraphQLString, description: 'Internal identifier for the MongoDB cache'},
          hasChanged: {type: GraphQLBoolean, description: 'Used internally to determine if Findur has made changes'}
        },
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
