import { NextFunction, Request, Response } from "express";
import BaseController from "../base.controller";
import UserRepository from "../../domain/repositories/user.repository";
import User from "../../domain/models/user.model";

class UsersController extends BaseController {

    constructor() {
        super("/v1/users");
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

    protected initializeRoutes() {
        this.router.get(this.path + "/register", this.register);
    }
}

export default UsersController;
