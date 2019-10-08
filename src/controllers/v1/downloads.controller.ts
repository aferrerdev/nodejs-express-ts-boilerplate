
import { NextFunction, Request, Response } from "express";
import BaseController from "../base.controller";

class DownloadsController extends BaseController {

    protected initializeRoutes() {
        this.router.get("/v1/downloads/ios", this.getAppleApp);
        this.router.get("/v1/downloads/android", this.getAndroidApp);
    }

    public getAppleApp(req: Request, res: Response, next: NextFunction) {
        res.send("iOS");
    }

    public getAndroidApp(req: Request, res: Response, next: NextFunction) {
        res.send("Android");
    }

}

export default DownloadsController;
