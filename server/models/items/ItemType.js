import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Item',
  description: 'This represents a item',
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
        resolve(item){
          return item.settle_date.toDateString();
        }
      },
      reference: {type: GraphQLString},
      status: {type: GraphQLString},
      tran_num: {type: GraphQLInt},
      custom_id: {type: GraphQLString},
      updatedAt: {
        type: GraphQLString,
        resolve(item){
          return item.updatedAt.toString();
        }
      },
      hasChanged: {type: GraphQLBoolean},
      createdAt: {
        type: GraphQLString,
        resolve(item){
          return item.createdAt.toString();
        }
      }

    };
  }
});
