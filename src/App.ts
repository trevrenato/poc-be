import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Sequelize } from 'sequelize-typescript';
import Routes from './routes';
import { AddressBookClient } from './clients';

class App {
  public express: Application;

  public sequelize: Sequelize;

  constructor() {
    this.express = express();
    this.sequelize = new Sequelize({
      database: 'poc_test',
      username: 'postgres',
      password: 'password',
      host: '172.21.0.3',
      port: 5432,
      dialect: 'postgres',
    });
    this.authenticateSequelize();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use('/', Routes);
  }

  private authenticateSequelize(): void {
    this.sequelize.addModels([AddressBookClient]);

    this.sequelize
      .authenticate()
      .then(() => {
        console.log('Sequelize Connection OK');
      })
      .catch((error: unknown) => {
        console.log(`Error on Sequelize Connection. Error: ${error}`);
      });
  }
}

export default new App().express;
