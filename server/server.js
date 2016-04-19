import Express from 'express';
import GraphHTTP from 'express-graphql';
import config from './config'
import log from './logger';
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
  log.info('API Service started', { port: APP_PORT });
})
