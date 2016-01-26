import Sequelize from 'Sequelize';
import _ from 'lodash';
import Faker from 'faker';
import config from './config'

const sqldb = config.sqldb;
const Conn = new Sequelize(sqldb.database, sqldb.username, sqldb.password, {
  host: sqldb.server,
  dialect: 'mssql',
  // dialectOptions: {
  //   instanceName: 'SQLEXPRESS'
  // },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Or you can simply use a connection uri
//var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

const Person = Conn.define('person', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

const Post = Conn.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

// relationships

Person.hasMany(Post);
Post.belongsTo(Person);

Conn.sync({force: true}).then(()=>{
  _.times(10, ()=>{
    return Person.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    }).then(person => {
      return person.createPost({
        title: `Sample title by ${person.firstName}`,
        content: 'This is some content'
      });
    });
  });
});

export default Conn;
