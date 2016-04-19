'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'Forecast',
  description: 'This represents a forecast',
  fields: function fields() {
    return {
      id: { type: _graphql.GraphQLInt },
      bunit: { type: _graphql.GraphQLString },
      party_id: { type: _graphql.GraphQLInt },
      portfolio: { type: _graphql.GraphQLString },
      season: { type: _graphql.GraphQLString },
      position: { type: _graphql.GraphQLFloat },
      currency: { type: _graphql.GraphQLString },
      settle_date: {
        type: _graphql.GraphQLString,
        resolve: function resolve(forecast) {
          return forecast.settle_date.toDateString();
        }
      },
      reference: { type: _graphql.GraphQLString },
      status: { type: _graphql.GraphQLString },
      tran_num: { type: _graphql.GraphQLInt },
      mongo_id: { type: _graphql.GraphQLString },
      updatedAt: {
        type: _graphql.GraphQLString,
        resolve: function resolve(forecast) {
          return forecast.updatedAt.toString();
        }
      },
      hasChanged: { type: _graphql.GraphQLBoolean },
      createdAt: {
        type: _graphql.GraphQLString,
        resolve: function resolve(forecast) {
          return forecast.createdAt.toString();
        }
      }

    };
  }
});
//# sourceMappingURL=ForecastType.js.map