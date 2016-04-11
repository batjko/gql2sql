import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
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
      id: {type: GraphQLInt},
      bunit: {type: GraphQLString},
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

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is our root query',
  fields: () => {
    return {
      forecasts: {
        type: new GraphQLList(ForecastType),
        args: {
          id: {type: GraphQLInt},
          bunit: {type: GraphQLString},
          season: {type: GraphQLString},
          currency: {type: GraphQLString},
          position: {type: GraphQLFloat},
          settle_date: {type: GraphQLString},
          reference: {type: GraphQLString},
          status: {type: GraphQLString},
          mongo_id: {type: GraphQLString},
          hasChanged: {type: GraphQLBoolean}
        },
        resolve(root, args) {
          const hasChanged = args.hasChanged;
          delete args.hasChanged;

          const opts = { where: args };
          if (hasChanged){
            opts.where.status = { ne: 'New' };
          } else {
            opts.where.status = 'New';
          }
          console.log(`FindAll Options:\n${JSON.stringify(opts)}`);

          return Forecast.findAll(opts);
        }
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Adding or Changing Forecasts in SQL',
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
          reference: {type: GraphQLString},
          mongo_id: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve(_,args){
          return Forecast.create({
            bunit: args.bunit,
            season: args.season,
            position: args.position,
            currency: args.currency,
            settle_date: new Date(args.settle_date),
            reference: args.reference,
            mongo_id: args.mongo_id,
            hasChanged: false
          });
        } // resolve
      }, // addForecast

      setMongoId: {
        type: GraphQLInt,
        description: 'Set the mongo_id of a forecast, using other fields as the identifier.',
        args: {
          id: {type: GraphQLInt},
          bunit: {type: GraphQLString},
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
          return Forecast.update({mongo_id: mongo_id}, {where: args });
        }
      },

      updateForecast: {
        type: GraphQLInt,
        description: 'Update an existing Forecast in the User table. Identify by either id or mongo_id!',
        args: {
          id: {type: GraphQLInt},
          bunit: {type: GraphQLString},
          season: {type: GraphQLString},
          currency: {type: GraphQLString},
          position: {type: GraphQLFloat},
          settle_date: {type: GraphQLString},
          reference: {type: GraphQLString},
          status: {type: GraphQLString},
          mongo_id: {type: GraphQLString}
        },
        resolve(_,args){
          const search= { $or: [{mongo_id: args.mongo_id}, {id: args.id}] };
          const retvals = Forecast.update(args,
            {where: search }
          );

          return retvals[0];
        } // resolve
      } // updateForecast

    } // return
  } // fields
}); // Mutation

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
