'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sqldb = _config2.default.sqldb;
var Conn = new _Sequelize2.default(sqldb.database, sqldb.username, sqldb.password, {
  host: sqldb.server,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: console.log
});

exports.default = Conn;
//# sourceMappingURL=db.js.map