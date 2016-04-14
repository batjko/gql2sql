import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Forecast',
  description: 'This represents a forecast',
  fields: () => {
    return {
      id: {type: GraphQLInt},
      bunit: {type: GraphQLString},
      party_id: {type: GraphQLInt},
      portfolio: {type: GraphQLString},
      season: {type: GraphQLString},
      position: {type: GraphQLFloat},
      currency: {type: GraphQLString},
      settle_date: {
        type: GraphQLString,
        resolve(forecast){
          return forecast.settle_date.toDateString();
        }
      },
      reference: {type: GraphQLString},
      status: {type: GraphQLString},
      tran_num: {type: GraphQLInt},
      mongo_id: {type: GraphQLString},
      updatedAt: {
        type: GraphQLString,
        resolve(forecast){
          return forecast.updatedAt.toString();
        }
      },
      hasChanged: {type: GraphQLBoolean},
      createdAt: {
        type: GraphQLString,
        resolve(forecast){
          return forecast.createdAt.toString();
        }
      }

    };
  }
});
