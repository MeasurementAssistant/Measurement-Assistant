import { Client } from 'pg';
import postgresConfig from './db.config';
import envConfig from '../../env-config';

class PostgresDriver {
  private _client: Client;
  private _config: postgresConfig;
  constructor(
    config: postgresConfig = {
      user: envConfig.db.user,
      password: envConfig.db.password,
      host: envConfig.db.host,
      database: envConfig.db.database,
      port: envConfig.db.port
    }
  ) {
    this._config = config;
    this._client = new Client(this._config);
  }

  public async connect() {
    try {
      this._client = new Client(this._config);
      await this._client.connect();
      //   console.log('connected');
    } catch (error) {
      throw new Error(`Error while connecting to database: ${error}`);
    }
  }

  public async disconnect() {
    try {
      await this._client.end();
      //   console.log('disconnected');
    } catch (error) {
      throw new Error(`Error while connecting to database: ${error}`);
    }
  }

  public async executeQuery(query: string) {
    try {
      return await this._client.query(query);
    } catch (error) {
      throw new Error(`Error while connecting to database: ${error}`);
    }
  }
}

export default PostgresDriver;
