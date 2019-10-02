import App from './application';
import DownloadsController from './api/v1/downloads.controller';
 
const application = new App(
  [
    new DownloadsController(),
  ],
  3000,
); 
application.listen();