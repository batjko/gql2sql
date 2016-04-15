'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// set up logger
// import winston from 'winston';
// require('winston-loggly');
//
// const log = new (winston.Logger)({
//   transports: [
//     new (winston.transports.Console)(),
//     new (winston.transports.File)({ filename: 'somefile.log' })
//   ]
// });
// winston.add(winston.transports.Loggly, config.winston);

// config
var APP_PORT = _config2.default.sqldb.port;

var app = (0, _express2.default)();

app.use('/graphql', (0, _expressGraphql2.default)({
  schema: _schema2.default,
  pretty: true,
  graphiql: true
}));

app.listen(APP_PORT, function () {
  _logger2.default.info('API Service started with log module.');
  console.log('Listening on port ' + APP_PORT + '...');
});
//# sourceMappingURL=server.js.map