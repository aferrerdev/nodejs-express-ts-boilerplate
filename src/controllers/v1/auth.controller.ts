
import { NextFunction, Request, Response } from "express";
import BaseController from "../base.controller";
import * as jwt from "jsonwebtoken";
import { sessionTokenSecret, sessionTokenLifeTime } from "../../config/jwt_session.config";

export default class AuthController extends BaseController {

    protected initializeRoutes() {
        this.router.get("/v1/auth/login", this.login);
        this.router.get("/v1/auth/logout", this.logout);
    }

    public login(req: Request, res: Response, next: NextFunction) {
        const token = jwt.sign({ userId: "hola" }, sessionTokenSecret, { expiresIn: sessionTokenLifeTime });
        res.status(200).json({ auth: true, token });
    }

    public logout(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({ auth: true });
    }
}
