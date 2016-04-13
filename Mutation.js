import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull
} from 'graphql';

import { ForecastModel, ForecastType } from './models/forecasts';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'Adding or Changing Forecasts in SQL',
  fields (){
    return {
      addForecast: {
        type: ForecastType,
        description: 'Insert a new Forecast into the User table.',
        args: {
          bunit: {type: new GraphQLNonNull(GraphQLString)},
          party_id: {type: GraphQLInt},
          portfolio: {type: GraphQLString},
          season: {type: new GraphQLNonNull(GraphQLString)},
          currency: {type: new GraphQLNonNull(GraphQLString)},
          position: {type: new GraphQLNonNull(GraphQLFloat)},
          settle_date: {type: new GraphQLNonNull(GraphQLString)},
          reference: {type: GraphQLString},
          mongo_id: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve(_,args){
          return ForecastModel.create({
            bunit: args.bunit,
            party_id: args.party_id || 0,
            portfolio: args.portfolio || '',
            season: args.season,
            position: args.position,
            currency: args.currency,
            settle_date: new Date(args.settle_date),
            reference: args.reference,
            mongo_id: args.mongo_id,
            hasChanged: 0
          });
        } // resolve
      }, // addForecast

      setMongoId: {
        type: GraphQLInt,
        description: 'Set the mongo_id of a forecast, using other fields as the identifier.',
        args: {
          id: {type: GraphQLInt},
          bunit: {type: GraphQLString},
          party_id: {type: GraphQLInt},
          portfolio: {type: GraphQLString},
          season: {type: GraphQLString},
          currency: {type: GraphQLString},
          position: {type: GraphQLFloat},
          settle_date: {type: GraphQLString},
          reference: {type: GraphQLString},
          status: {type: GraphQLString},
          mongo_id: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(_,args) {
          const mongo_id = args.mongo_id;
          delete args.mongo_id;
          return ForecastModel.update({mongo_id: mongo_id, hasChanged: 0}, {where: args });
        }
      },

      updateForecast: {
        type: GraphQLInt,
        description: 'Update an existing Forecast in the User table. Identify by either id or mongo_id!',
        args: {
          id: {type: GraphQLInt},
          bunit: {type: GraphQLString},
          party_id: {type: GraphQLInt},
          portfolio: {type: GraphQLString},
          season: {type: GraphQLString},
          currency: {type: GraphQLString},
          position: {type: GraphQLFloat},
          settle_date: {type: GraphQLString},
          reference: {type: GraphQLString},
          status: {type: GraphQLString},
          mongo_id: {type: GraphQLString}
        },
        resolve(_,args){
          args.hasChanged = 0;
          const search= { $or: [{mongo_id: args.mongo_id}, {id: args.id}] };
          const retvals = ForecastModel.update(args,
            {where: search }
          );

          return retvals[0];
        } // resolve
      } // updateForecast

    } // return
  } // fields
}); // Mutation
