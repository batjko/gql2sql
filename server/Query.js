import {
  GraphQLObjectType,
  GraphQLList
} from 'graphql';

import { ItemModel, ItemType, ItemArgs } from './models/items';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'This is our Item query',
  fields: () => {
    return {
      items: {
        type: new GraphQLList(ItemType),
        args: ItemArgs,
        resolve(root, args) {
          const opts = { where: args };

          if (args.hasOwnProperty("hasChanged")) {
            const hasChanged = args.hasChanged;
            delete args.hasChanged;
            // SQL may use 1 or 2 instead of a boolean type
            opts.where.hasChanged = hasChanged ? 1 : 0;
          }
          return ItemModel.findAll(opts);
        }
      }
    }
  }
});
