
import { Request, Response, NextFunction } from 'express';
import BaseController from '../base.controller';

class DownloadsController extends BaseController {

    constructor() {
        super('/downloads');
    }

    protected initializeRoutes() {
        this.router.get(this.path+'/ios', this.getAppleApp);
        this.router.get(this.path+'/android', this.getAndroidApp);
    }

    getAppleApp(req: Request, res: Response, next: NextFunction) {
        res.send('iOS');
    }

    getAndroidApp(req: Request, res: Response, next: NextFunction) {
        res.send('Android');
    }
}

export default DownloadsController;