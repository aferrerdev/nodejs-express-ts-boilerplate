import express from "express";
import BaseController from "./controllers/base.controller";
import * as bodyParser from "body-parser";
import MongoDbConnection from "./config/mongodb.config";
import { JwtVerifyMiddleware } from "./middleware/jwt_verify.middleware";
import { ErrorHandlerMiddleware } from "./middleware/errorHandler.middleware";

class Application {

  public app: express.Application;
  public port: number;

  constructor(controllers: BaseController[], port: number) {
    this.app = express();
    this.port = port;

    this.initDataBaseConnection();
    this.initMiddlewares();
    this.initControllers(controllers);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Environment: ${this.app.get("env")}`);
      console.log(`Webserver listening on the port ${this.port}`);
    });
  }

  private initDataBaseConnection() {
    new MongoDbConnection().connect();
  }

  private initMiddlewares() {
    // Security middleware to validate requests
    this.app.use(JwtVerifyMiddleware);
    // Error handling middleware
    this.app.use(ErrorHandlerMiddleware);
    this.app.use(bodyParser.json());
  }

  private initControllers(controllers: BaseController[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
      console.log(`Controller initialized: ${controller.constructor.name}`)
    });
  }
}

export default Application;
