import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './schema';
import config from './config'

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
