import Express from 'express';
import GraphHTTP from 'express-graphql';
import config from './config'
import Conn from './db';
import Schema from './schema';

// config
const APP_PORT = config.sqldb.port;

const app = Express();

app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

app.listen(APP_PORT, () => {
  console.log(`Listening on port ${APP_PORT}...`);
})
