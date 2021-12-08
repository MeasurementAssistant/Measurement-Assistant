import fastify from 'fastify';
import PostgresDriver from './src/db/pg';
import dbInitQuery from './src/db/pg/db_init';
import * as routes from './src/api';

const server = fastify();
const dbDriver = new PostgresDriver();

server.route(routes.getShoesSize);
server.route(routes.getShoesBrandSize);
server.route(routes.getClothesSize);
server.route(routes.getClothesSizeReebok);
server.route(routes.getClothesSizeAdidas);
server.route(routes.getBodyType);

(async () => {
  await dbDriver.connect();
  const initResult = await dbDriver.executeQuery(dbInitQuery);
  await dbDriver.disconnect();
  console.log(`DB init result`, initResult);
})();

server.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
