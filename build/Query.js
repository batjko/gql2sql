'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _forecasts = require('./models/forecasts');

exports.default = new _graphql.GraphQLObjectType({
  name: 'Query',
  description: 'This is our Forecast query',
  fields: function fields() {
    return {
      forecasts: {
        type: new _graphql.GraphQLList(_forecasts.ForecastType),
        args: _forecasts.ForecastArgs,
        resolve: function resolve(root, args) {
          var opts = { where: args };

          if (args.hasOwnProperty("hasChanged")) {
            var hasChanged = args.hasChanged;
            delete args.hasChanged;
            opts.where.hasChanged = hasChanged ? 1 : 0;
          }
          return _forecasts.ForecastModel.findAll(opts);
        }
      }
    };
  }
});
//# sourceMappingURL=Query.js.map