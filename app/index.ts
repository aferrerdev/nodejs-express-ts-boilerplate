import App from './application';
// API Controllers
import DownloadsController from './api/v1/downloads.controller';
import UsersController from './api/v1/users.controller';

const application = new App(
    // API Controllers
    [
        new DownloadsController(),
        new UsersController()
    ],
    // Webserver port
    3000,
);
application.listen();