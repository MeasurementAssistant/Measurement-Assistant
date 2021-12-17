const env = process.env.NODE_ENV || 'dev';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { envConfig } = require(`./configs/${env}`);

if (!envConfig) {
  throw new Error('Config for given NODE_ENV was not found');
}

export default envConfig;
