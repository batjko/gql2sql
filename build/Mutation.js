'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _forecasts = require('./models/forecasts');

exports.default = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  description: 'Adding or Changing Forecasts in SQL',
  fields: function fields() {
    return {
      addForecast: {
        type: _forecasts.ForecastType,
        description: 'Insert a new Forecast into the User table.',
        args: _forecasts.ForecastArgs,
        resolve: function resolve(_, args) {
          return _forecasts.ForecastModel.create({
            bunit: args.bunit,
            party_id: args.party_id || 0,
            portfolio: args.portfolio || '',
            season: args.season,
            position: args.position,
            currency: args.currency,
            settle_date: new Date(args.settle_date),
            reference: args.reference,
            mongo_id: args.mongo_id,
            hasChanged: 0
          });
        } // resolve

      }, // addForecast

      setMongoId: {
        type: _graphql.GraphQLInt,
        description: 'Set the mongo_id of a forecast, using other fields as the identifier.',
        args: _forecasts.ForecastArgs,
        resolve: function resolve(_, args) {
          var mongo_id = args.mongo_id;
          delete args.mongo_id;
          return _forecasts.ForecastModel.update({ mongo_id: mongo_id, hasChanged: 0 }, { where: args });
        }
      },

      updateForecast: {
        type: _graphql.GraphQLInt,
        description: 'Update an existing Forecast in the User table. Identify by either id or mongo_id!',
        args: _forecasts.ForecastArgs,
        resolve: function resolve(_, args) {
          args.hasChanged = 0;
          var search = { $or: [{ mongo_id: args.mongo_id }, { id: args.id }] };
          var retvals = _forecasts.ForecastModel.update(args, { where: search });

          return retvals[0];
        } // resolve

      } // updateForecast

    }; // return
  } // fields

}); // Mutation
//# sourceMappingURL=Mutation.js.map