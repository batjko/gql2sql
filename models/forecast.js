import Conn from '../db';
import Sequelize from 'Sequelize';

const Forecast = Conn.define('USER_TSP_Forecasts', {
  bunit: {
    type: Sequelize.STRING,
    allowNull: false
  },
  season: {
    type: Sequelize.STRING,
    allowNull: false
  },
  position: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  currency: {
    type: Sequelize.STRING,
    allowNull: false
  },
  settle_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  reference: {
    type: Sequelize.STRING,
    allowNull: true
  },
  status: {
    type:   Sequelize.ENUM,
    values: ['PENDING', 'LOADED', 'UPDATED', 'MATURED', 'ERROR'],
    defaultValue: 'PENDING'
  }
});

// seed with a single row
// Forecast.create({
//   bunit: 'THOMSONAIR',
//   season: 'W16',
//   position: 8000.99,
//   currency: 'SEK',
//   settle_date: new Date('31-DEC-2016'),
//   reference: 'Inserted via basic create function'
// }).then(forecast => {
//   console.log(`Forecast '${forecast.id}' created.`);
// }).catch(err => {
//   console.error(err);
// });




export default Forecast;
