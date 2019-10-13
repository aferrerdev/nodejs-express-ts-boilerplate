import { NextFunction, Request, Response } from "express";
import BaseController from "../base.controller";
import UserRepository from "../../domain/repositories/user.repository";
import User from "../../domain/models/user.model";
import * as bcryp from "bcrypt";
import * as jwt from "jsonwebtoken";
import { sessionTokenSecret, sessionTokenLifeTime } from "../../config/jwt_session.config";

export default class UsersController extends BaseController {

    protected initializeRoutes() {
        this.router.post("/v1/users/register", this.register);
        this.router.post("/v1/users/view", this.view);
    }

    public async view(req: Request, res: Response, next: NextFunction) {
        const repository = new UserRepository();
        res.json(await repository.view(req.body.email));
    }

    public async register(req: Request, res: Response, next: NextFunction) {
        const repository = new UserRepository();
        const userExists = await repository.exists(req.body.email);
        if (!userExists) {
            console.log("Create");
            bcryp.hash("awdawdawdawda", 10, (err, hash) => {
                if (!err) {
                    const user = new User();
                    user.name = req.body.name;
                    user.email = req.body.email;
                    user.lastName = req.body.lastName;
                    user.setPassword(hash);
                    user.token = jwt.sign({ email: user.email }, sessionTokenSecret, { expiresIn: sessionTokenLifeTime });
                    repository.create(user);
                    res.json(user);
                }
            });
        } else {
            res.status(409).json({ 
                status: 409,
                name: "Conflict",
                message: "An account with this email is already registered" 
            });
        }
        
    }
}
