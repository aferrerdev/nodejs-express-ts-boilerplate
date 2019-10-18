import { RequestHandler, NextFunction, Request, Response } from "express";
import * as bcryp from "bcrypt";
import * as jwt from "jsonwebtoken";
import { sessionTokenSecret, sessionTokenLifeTime } from "../../../config/jwt.config";
import UserRepository from '../../../domain/repositories/user.repository';

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const repository = new UserRepository();
        const userExists = await repository.exists(req.body.email);
        if (userExists) {
            bcryp.hash(req.body.password, 10, (err, hash) => {
                const token = jwt.sign({ userId: "hola" }, sessionTokenSecret, { expiresIn: sessionTokenLifeTime });
                res.status(200).json({ auth: true, token });
            });
        }
        else {
            res.status(404).json({ status: 404, message: "User not found" });
        }
};