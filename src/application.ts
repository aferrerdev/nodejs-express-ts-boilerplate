import express from "express";
import BaseController from "./controllers/base.controller";
import * as bodyParser from "body-parser";
import MongoDbConnection from "./config/mongodb.config";
import { JwtVerifyMiddleware } from "./middleware/jwt_verify.middleware";

class Application {

  public app: express.Application;
  public port: number;

  constructor(controllers: BaseController[], port: number) {
    this.app = express();
    this.port = port;

    new MongoDbConnection().connect();
    this.initMiddlewares();
    this.initControllers(controllers);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initMiddlewares() {
    // Security middleware to validate requests
    this.app.use(JwtVerifyMiddleware);
    this.app.use(bodyParser.json());
  }

  private initControllers(controllers: BaseController[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
}

export default Application;
