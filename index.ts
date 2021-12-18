import fastify from 'fastify';
import swagger from 'fastify-swagger';
import fastifyCors from 'fastify-cors';
import PostgresDriver from './src/db/pg';
import dbInitQuery from './src/db/pg/db_init';
import swaggerConfig from './src/env-config/swagger.config';
import envConfig from './src/env-config';
import * as routes from './src/api';
import { configureI18n } from './src/i18n.config';

const server = fastify();
const dbDriver = new PostgresDriver();

server.register(fastifyCors, {
  origin: 'https://measurementassistant.github.io/Measurement-Assistant-Portal/',
  methods: ['GET', 'POST', 'PUT']
});
server.register(swagger, swaggerConfig);

server.route(routes.getShoesSize);
server.route(routes.getShoesBrandSize);
server.route(routes.getClothesSize);
server.route(routes.getClothesBrandSize);
server.route(routes.getBodyType);
server.route(routes.getAllSizes);
server.route(routes.createUser);
server.route(routes.updateAccessKey);

(async () => {
  await dbDriver.connect();
  const initResult = await dbDriver.executeQuery(dbInitQuery);
  await dbDriver.disconnect();
  console.log(`DB init result`, initResult);
})();

server.listen(envConfig.port || 3000, envConfig.host, (err, address) => {
  if (err) {
    const [i18n] = configureI18n(true);
    i18n.init;
    server.swagger();
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
