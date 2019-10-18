import { RequestHandler, NextFunction, Request, Response } from "express";
import * as bcryp from "bcrypt";
import * as jwt from "jsonwebtoken";
import { sessionTokenSecret, sessionTokenLifeTime } from "../../../config/jwt.config";
import User from '../../../domain/models/user.model';
import UserRepository from '../../../domain/repositories/user.repository';

export const registerUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email) {
        res.status(422).json({ 
            status: 422 ,
            name: "Required parameter not present",
            message: "Email parameter was not sent" 
        });
    }
    const repository = new UserRepository();
    const userExists = await repository.exists(req.body.email);
    if (!userExists) {
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
};
