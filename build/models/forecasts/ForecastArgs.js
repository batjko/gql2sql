'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = {
  id: { type: _graphql.GraphQLInt, description: 'SQL ID to correlate the forecast with Findur USER table' },
  bunit: { type: _graphql.GraphQLString, description: 'Short_Name of the business unit' },
  party_id: { type: _graphql.GraphQLInt, description: 'Unused' },
  portfolio: { type: _graphql.GraphQLString, description: 'Unused' },
  season: { type: _graphql.GraphQLString, description: 'Season, e.g. W16' },
  currency: { type: _graphql.GraphQLString, description: 'Currency of the Forecast Amount' },
  position: { type: _graphql.GraphQLFloat, description: 'Forecast Amount' },
  settle_date: { type: _graphql.GraphQLString, description: '' },
  reference: { type: _graphql.GraphQLString, description: 'Free-format Reference field' },
  status: { type: _graphql.GraphQLString, description: 'Initially "New", gets updated by Findur' },
  tran_num: { type: _graphql.GraphQLInt, description: 'Once booked in Findur, a transaction number gets assigned' },
  mongo_id: { type: _graphql.GraphQLString, description: 'Internal identifier for the MongoDB cache' },
  hasChanged: { type: _graphql.GraphQLBoolean, description: 'Used internally to determine if Findur has made changes' }
};
//# sourceMappingURL=ForecastArgs.js.map