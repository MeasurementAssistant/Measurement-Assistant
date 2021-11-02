import fastify from 'fastify';
import PostgresDriver from './src/db/pg';

const server = fastify();
const dbDriver = new PostgresDriver();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.get('/ping', async (request, reply) => {
  await dbDriver.connect();
  await dbDriver.disconnect();
  return 'pong\n';
});

server.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
