import { QueryResult } from 'pg';
import axios from 'axios';
import crypto from 'crypto';
import HttpError from '../../errors/httpErrors';
import PostgresDriver from '../../db/pg';
import {
  createAccessKey,
  createUser,
  findUser,
  getUserInfo,
  findUserAccessKeyId,
  updateAccessKey
} from '../../db/pg/db_queries';

class UserService {
  private dbDriver = new PostgresDriver();

  async checkAndCreateUser(
    email: string,
    googleId: string,
    idToken: string
  ): Promise<{ [key: string]: string }> {
    try {
      const isTokenId = await this.checkIdToken(idToken, email);
      if (isTokenId) {
        await this.dbDriver.connect();
        const checkUser = await this.findUserIfExists(email);
        if (!checkUser) {
          const id = await this.createAccessKey(email, googleId);
          await this.dbDriver.executeQuery(createUser(email, id));
        }
        const userData: QueryResult = await this.dbDriver.executeQuery(getUserInfo(email));
        await this.dbDriver.disconnect();
        return userData.rows[0];
      } else {
        throw new HttpError('Invalid google tokenId', 401);
      }
    } catch (error) {
      const statusCode = error instanceof HttpError ? error.statusCode : undefined;
      throw new HttpError(<string>error, statusCode);
    }
  }

  async updateAccessKey(
    email: string,
    googleId: string,
    idToken: string
  ): Promise<{ [key: string]: string }> {
    try {
      const isTokenId = await this.checkIdToken(idToken, email);
      if (isTokenId) {
        await this.dbDriver.connect();
        await this.updatePreviousAccessKey(email, googleId);
        const userData: QueryResult = await this.dbDriver.executeQuery(getUserInfo(email));
        await this.dbDriver.disconnect();
        return userData.rows[0];
      } else {
        throw new HttpError('Invalid google tokenId', 401);
      }
    } catch (error) {
      const statusCode = error instanceof HttpError ? error.statusCode : undefined;
      const message = error instanceof HttpError ? error.message : <string>error;
      throw new HttpError(message, statusCode);
    }
  }

  private async findUserIfExists(username: string): Promise<boolean> {
    try {
      const user: QueryResult = await this.dbDriver.executeQuery(findUser(username));
      return user && user.rows[0] ? true : false;
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }

  private async createAccessKey(username: string, googleId: string): Promise<number> {
    try {
      const accessKey = crypto
        .createHash('sha256')
        .update(`${username}:${googleId}:${Date.now()}`, 'utf-8')
        .digest('hex');
      const accessKeyId: QueryResult = await this.dbDriver.executeQuery(createAccessKey(accessKey));
      return accessKeyId && accessKeyId.rows[0] ? accessKeyId.rows[0]._id : -1;
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }

  private async updatePreviousAccessKey(username: string, googleId: string): Promise<void> {
    try {
      const userAccessKeyId = await this.dbDriver.executeQuery(findUserAccessKeyId(username));

      if (userAccessKeyId && userAccessKeyId.rows[0]) {
        const accessKey = crypto
          .createHash('sha256')
          .update(`${username}:${googleId}:${Date.now()}`, 'utf-8')
          .digest('hex');

        await this.dbDriver.executeQuery(
          updateAccessKey(accessKey, userAccessKeyId.rows[0].accessKeyId)
        );
      } else {
        throw new HttpError('There is no such user', 401);
      }
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }

  private async checkIdToken(token: string, username: string): Promise<boolean> {
    let isTokenId = false;
    try {
      const result = await axios({
        url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
      });
      if (result.status == 200 && result.data.email == username) {
        isTokenId = true;
      }
      return isTokenId;
    } catch (error) {
      throw new HttpError('Invalid google tokenId', 401);
    }
  }
}

export default UserService;
