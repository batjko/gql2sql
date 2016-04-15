import config from './config'
import Sequelize from 'Sequelize';
import log from './logger';

const sqldb = config.sqldb;
const Conn = new Sequelize(sqldb.database, sqldb.username, sqldb.password, {
  host: sqldb.server,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: log
});

export default Conn;
