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
      // id: {
      //   type: GraphQLInt,
      //   resolve(forecast) {
      //     return forecast.id;
      //   }
      // },
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
          return forecast.getPosts();
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
      last_updated: {
        type: GraphQLString,
        resolve(forecast){
          return forecast.last_updated.toString();
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
          }
        },
        resolve(root, args) {
          return Db.models.Forecast.findAll({where: args});
        }
      }
    }
  }
});

// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   description: 'Functions to create stuff',
//   fields (){
//     return {
//       addforecast: {
//         type: forecast,
//         args: {
//           firstName: {
//             type: new GraphQLNonNull(GraphQLString)
//           },
//           lastName: {
//             type: new GraphQLNonNull(GraphQLString)
//           },
//           email: {
//             type: new GraphQLNonNull(GraphQLString)
//           }
//         },
//         resolve(_,args){
//           return Db.models.forecast.create({
//             firstName: args.firstName,
//             lastName: args.lastName,
//             email: args.email.toLowerCase()
//           });
//         }
//       }
//     }
//   }
// });

const Schema = new GraphQLSchema({
  query: Query
  // mutation: Mutation
});

export default Schema;
