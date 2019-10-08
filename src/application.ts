import express from "express";
import BaseController from "./controllers/base.controller";
import * as bodyParser from "body-parser";
import MongoDbConnection from "./config/mongodb";

class Application {

  public app: express.Application;
  public port: number;

  constructor(controllers: BaseController[], port: number) {
    this.app = express();
    this.port = port;

    new MongoDbConnection().connect();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: BaseController[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
}

export default Application;
