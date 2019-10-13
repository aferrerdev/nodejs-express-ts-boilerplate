import { NextFunction, Request, Response } from "express";
import BaseController from "../base.controller";
import UserRepository from "../../domain/repositories/user.repository";
import User from "../../domain/models/user.model";

export default class UsersController extends BaseController {

    protected initializeRoutes() {
        this.router.get("/v1/users/register", this.register);
    }

    public register(req: Request, res: Response, next: NextFunction) {
        const user = new User();
        user.name = "Alex";
        user.lastName = "Ferrer";
        user.password = "patata";
        user.token = "asdadasdasdas";
        user.email = "example@gmail.com";

        new UserRepository().create(user);
        res.send(user);
    }
}
