import { RequestHandler, NextFunction, Request, Response } from "express";
import * as bcryp from "bcrypt";
import * as jwt from "jsonwebtoken";
import { sessionTokenSecret, sessionTokenLifeTime } from "../../../config/jwt.config";
import User from "../../../domain/models/user.model";
import UserRepository from "../../../domain/repositories/user.repository";

export const registerUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Validate required parameters
        const requiredParameters = ["email", "name", "lastName", "password"];
        for (const param of requiredParameters) {
            if (!req.body[param]) {
                return res.status(422).json({ 
                    message: `Required parameter ${param} was not present in the request body` 
                });
            }
        }
        
        // Check if user exists
        const repository = new UserRepository();
        const userExists = await repository.exists(req.body.email);
        if (userExists) {
            return res.status(409).json({ message: "Conflict: An account with this email is already registered." });
        }
        // Hash user password
        bcryp.hash(req.body.password, 10, (err, hash) => {
            if (!err) {
                // Create user and store in database
                const user = new User();
                user.name = req.body.name;
                user.email = req.body.email;
                user.lastName = req.body.lastName;
                user.setPassword(hash);
                user.token = jwt.sign({ email: user.email }, sessionTokenSecret, { expiresIn: sessionTokenLifeTime });
                repository.create(user);
                return res.status(200).json(user);
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" }); 
    }
};
