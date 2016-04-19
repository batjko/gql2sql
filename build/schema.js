'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _Query = require('./Query.js');

var _Query2 = _interopRequireDefault(_Query);

var _Mutation = require('./Mutation.js');

var _Mutation2 = _interopRequireDefault(_Mutation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = new _graphql.GraphQLSchema({
  query: _Query2.default,
  mutation: _Mutation2.default
});

exports.default = Schema;
//# sourceMappingURL=schema.js.map