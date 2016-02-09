import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import Db from './db';
import Forecast from './models/forecast';

const ForecastType = new GraphQLObjectType({
  name: 'Forecast',
  description: 'This represents a forecast',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(forecast) {
          return forecast.id;
        }
      },
      bunit: {
        type: GraphQLString,
        resolve(forecast){
          return forecast.bunit;
        }
      },
      season: {
        type: GraphQLString,
        resolve(forecast){
          return forecast.season;
        }
      },
      position: {
        type: GraphQLFloat ,
        resolve(forecast){
          return forecast.position;
        }
      },
      currency: {
        type: GraphQLString,
        resolve(forecast){
          return forecast.currency;
        }
      },
      settle_date: {
        type: GraphQLString,
        resolve(forecast){
          return forecast.settle_date.toDateString();
        }
      },
      reference: {
        type: GraphQLString,
        resolve(forecast){
          return forecast.reference;
        }
      },
      status: {
        type: GraphQLString,
        resolve(forecast){
          return forecast.status;
        }
      },
      updatedAt: {
        type: GraphQLString,
        resolve(forecast){
          return forecast.updatedAt.toString();
        }
      },
      createdAt: {
        type: GraphQLString,
        resolve(forecast){
          return forecast.createdAt.toString();
        }
      }

    };
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is our root query',
  fields: () => {
    return {
      forecasts: {
        type: new GraphQLList(ForecastType),
        args: {
          id: {
            type: GraphQLInt
          },
          bunit: {
            type: GraphQLString
          },
          season: {
            type: GraphQLString
          },
          currency: {
            type: GraphQLString
          },
          settle_date: {
            type: GraphQLString
          },
          reference: {
            type: GraphQLString
          },
          status: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return Forecast.findAll({where: args});
        }
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create stuff',
  fields (){
    return {
      addForecast: {
        type: ForecastType,
        description: 'Insert a new Forecast into the User table.',
        args: {
          bunit: {type: new GraphQLNonNull(GraphQLString)},
          season: {type: new GraphQLNonNull(GraphQLString)},
          currency: {type: new GraphQLNonNull(GraphQLString)},
          position: {type: new GraphQLNonNull(GraphQLFloat)},
          settle_date: {type: new GraphQLNonNull(GraphQLString)},
          reference: {type: GraphQLString}
        },
        resolve(_,args){
          return Forecast.create({
            bunit: args.bunit,
            season: args.season,
            position: args.position,
            currency: args.currency,
            settle_date: new Date(args.settle_date),
            reference: args.reference
          });
        } // resolve
      } // addForecast
    } // return
  } // fields
}); // Mutation

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
