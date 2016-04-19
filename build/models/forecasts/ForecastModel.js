'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _Sequelize = require('Sequelize');

var _Sequelize2 = _interopRequireDefault(_Sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ForecastModel = _db2.default.define('USER_TSP_Forecasts', {
  bunit: {
    type: _Sequelize2.default.STRING,
    allowNull: true
  },
  party_id: {
    type: _Sequelize2.default.INTEGER,
    allowNull: true
  },
  portfolio: {
    type: _Sequelize2.default.STRING,
    allowNull: true
  },
  season: {
    type: _Sequelize2.default.STRING,
    allowNull: true
  },
  position: {
    type: _Sequelize2.default.FLOAT,
    allowNull: true
  },
  currency: {
    type: _Sequelize2.default.STRING,
    allowNull: true
  },
  settle_date: {
    type: _Sequelize2.default.DATE,
    allowNull: true
  },
  reference: {
    type: _Sequelize2.default.STRING,
    allowNull: true
  },
  mongo_id: {
    type: _Sequelize2.default.STRING,
    allowNull: true
  },
  status: {
    type: _Sequelize2.default.STRING,
    defaultValue: 'New'
  },
  tran_num: {
    type: _Sequelize2.default.INTEGER,
    allowNull: true
  },
  hasChanged: {
    type: _Sequelize2.default.INTEGER,
    optional: true
  }
});

exports.default = ForecastModel;
//# sourceMappingURL=ForecastModel.js.map