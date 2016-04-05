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
