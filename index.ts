import fastify from 'fastify';
import PostgresDriver from './src/db/pg';
import dbInitQuery from './src/db/pg/db_init';
import * as routes from './src/api';

const server = fastify();
const dbDriver = new PostgresDriver();

server.route(routes.getShoesSize);
server.route(routes.getShoesBrandSize);
server.route(routes.getClothesSize);
server.route(routes.getClothesBrandSize);
server.route(routes.getBodyType);
server.route(routes.getAllSizes);

(async () => {
  await dbDriver.connect();
  const initResult = await dbDriver.executeQuery(dbInitQuery);
  await dbDriver.disconnect();
  console.log(`DB init result`, initResult);
})();

server.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
