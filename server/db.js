import config from './config'
import Sequelize from 'Sequelize';

const sqldb = config.sqldb;
const Conn = new Sequelize(sqldb.database, sqldb.username, sqldb.password, {
  host: sqldb.server,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: console.log
});

export default Conn;
