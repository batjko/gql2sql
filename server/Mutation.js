import {
  GraphQLObjectType,
  GraphQLInt
} from 'graphql';

import { ItemModel, ItemType, ItemArgs } from './models/items';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'Adding or Changing Items in SQL',
  fields (){
    return {
      addItem: {
        type: ItemType,
        description: 'Insert a new Item into the SQL table.',
        args: ItemArgs,
        resolve(_,args){
          return ItemModel.create({
            name: args.name,
            amount: args.amount || 0.00,
            custom_id: args.custom_id,
            hasChanged: 0
          });
        } // resolve
      }, // addItem

      setCustomId: {
        type: GraphQLInt,
        description: 'Set a custom ID of an item, e.g. for sync purposes.',
        args: ItemArgs,
        resolve(_,args) {
          const custom_id = args.custom_id;
          delete args.custom_id;
          return ItemModel.update({ custom_id: custom_id, hasChanged: 0 }, { where: args });
        }
      },

      updateItem: {
        type: GraphQLInt,
        description: 'Update an existing Item in the table.',
        args: ItemArgs,
        resolve(_,args){
          args.hasChanged = 0;
          const search= { $or: [{ custom_id: args.custom_id }, { id: args.id }] };
          const retvals = ItemModel.update(args,
            { where: search }
          );

          return retvals[0];
        } // resolve
      } // updateItem

    } // return
  } // fields
}); // Mutation
