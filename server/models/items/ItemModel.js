import Conn from '../../db';
import Sequelize from 'Sequelize';

// Assuming you have an 'Items' table in your SQL database, with at least these four columns

const ItemModel = Conn.define('Items', {
  name: {
    type: Sequelize.STRING,
  },
  amount: {
    type: Sequelize.FLOAT,
  },
  custom_id: {
    type: Sequelize.STRING,
    allowNull: true
  },
  hasChanged: {
    type: Sequelize.INTEGER,
    optional: true
  }
});

export default ItemModel;
