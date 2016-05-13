import {
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLBoolean
} from 'graphql';

export default {
  id: {type: GraphQLInt, description: 'SQL ID, unique identifier in SQL Table'},
  name: {type: GraphQLString, description: 'The name of the item'},
  amount: {type: GraphQLFloat, description: 'A Float/Decimal number'},
  custom_id: {type: GraphQLID, description: 'A custom ID of sorts'},
  hasChanged: {type: GraphQLBoolean, description: 'Some flag perhaps?'}
}
