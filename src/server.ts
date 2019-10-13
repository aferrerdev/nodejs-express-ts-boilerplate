import App from "./application";

// API Controllers
import DownloadsController from "./controllers/v1/downloads.controller";
import UsersController from "./controllers/v1/users.controller";
import AuthController from "./controllers/v1/auth.controller";

const application = new App(
    // API Controllers
    [
        // API V1 Version
        new AuthController(),
        new DownloadsController(),
        new UsersController()
    ],
    // Webserver port
    3000,
);
application.listen();
