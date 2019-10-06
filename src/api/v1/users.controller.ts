import { NextFunction, Request, Response } from "express";
import BaseController from "../base.controller";

class UsersController extends BaseController {

    constructor() {
        super("/v1/users");
    }

    public registerUser(req: Request, res: Response, next: NextFunction) {
        res.send("registerUser");
    }

    protected initializeRoutes() {
        this.router.get(this.path + "/register", this.registerUser);
    }
}

export default UsersController;
