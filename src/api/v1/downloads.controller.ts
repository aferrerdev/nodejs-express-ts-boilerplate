
import { NextFunction, Request, Response } from "express";
import BaseController from "../base.controller";

class DownloadsController extends BaseController {

    constructor() {
        super("/v1/downloads");
    }

    public getAppleApp(req: Request, res: Response, next: NextFunction) {
        res.send("iOS");
    }

    public getAndroidApp(req: Request, res: Response, next: NextFunction) {
        res.send("Android");
    }

    protected initializeRoutes() {
        this.router.get(this.path + "/ios", this.getAppleApp);
        this.router.get(this.path + "/android", this.getAndroidApp);
    }
}

export default DownloadsController;
