import express from "express";
import * as bodyParser from "body-parser";
import MongoDbConnection from "./config/mongodb.config";
import { JwtVerificationMiddleware } from "./middleware/jwtVerification.middleware";
import { ErrorHandlerMiddleware } from "./middleware/errorHandler.middleware";
import router from "./routes";

class Application {

  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initDataBaseConnection();
    this.initMiddlewares();

    // Install application paths routing table
    this.app.use(router);
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
    this.app.use(JwtVerificationMiddleware);

    // Error handling middleware
    this.app.use(ErrorHandlerMiddleware);
    this.app.use(bodyParser.json());
  }
}

export default Application;
