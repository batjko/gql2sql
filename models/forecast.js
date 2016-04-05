import Conn from '../db';
import Sequelize from 'Sequelize';

const Forecast = Conn.define('USER_TSP_Forecasts', {
  bunit: {
    type: Sequelize.STRING,
    allowNull: true
  },
  season: {
    type: Sequelize.STRING,
    allowNull: true
  },
  position: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  currency: {
    type: Sequelize.STRING,
    allowNull: true
  },
  settle_date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  reference: {
    type: Sequelize.STRING,
    allowNull: true
  },
  mongo_id: {
    type: Sequelize.STRING,
    allowNull: true
  },
  status: {
    type:   Sequelize.STRING,
    defaultValue: 'New'
  }
});

export default Forecast;
