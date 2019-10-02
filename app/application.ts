import express from 'express';
import * as bodyParser from 'body-parser';
import BaseController from './api/base.controller';
import mongoose from 'mongoose';
import 'dotenv/config';

class Application {
  public app: express.Application;
  public port: number;
 
  constructor(controllers: Array<BaseController>, port: number) {
    this.app = express();
    this.port = port;
 
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }
 
  private initializeControllers(controllers: Array<BaseController>) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private connectToTheDatabase() {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env;
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, { 
      useNewUrlParser: true,
      useUnifiedTopology: true
     });
    mongoose.connection.on('connected', () => console.log('Connected to mongodb'));
    mongoose.connection.on('error', () => console.log('Error connecting to mongodb'));
    mongoose.connection.on('disconnected', () => console.log('Disconnected from mongo'));
  }
}
 
export default Application;