import express from 'express';
import * as bodyParser from 'body-parser';
import BaseController from './api/base.controller';
 
class Application {
  public app: express.Application;
  public port: number;
 
  constructor(controllers: Array<BaseController>, port: number) {
    this.app = express();
    this.port = port;
 
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
}
 
export default Application;