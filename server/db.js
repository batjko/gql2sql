import config from './config'
import Sequelize from 'Sequelize';
import log from './logger';

const infoLogger = log.info;

const sqldb = config.sqldb;
const Conn = new Sequelize(sqldb.database, sqldb.username, sqldb.password, {
  host: sqldb.server,
  dialect: sqldb.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: infoLogger
});

export default Conn;
