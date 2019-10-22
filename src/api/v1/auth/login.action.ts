import { RequestHandler, NextFunction, Request, Response } from "express";
import * as bcryp from "bcrypt";
import * as jwt from "jsonwebtoken";
import { sessionTokenSecret, sessionTokenLifeTime } from "../../../config/jwt.config";
import UserRepository from "../../../domain/repositories/user.repository";

/**
 * POST method
 * login action
 */
export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    // Check that email is set in the response POST body
    if (!req.body.email) {
        res.status(422).json({ status: 422, message: "Email field is mandatory." });
        return;
    }
    // Check that password is set in the response POST body
    if (!req.body.password) {
        res.status(422).json({ status: 422, message: "Password parameter is mandatory." });
        return;
    }
    try {
        const repository = new UserRepository();
        // Check if user exists
        const userExists = await repository.exists(req.body.email);
        if (!userExists) {
            res.status(404).json({ status: 404, message: "User not found" });
            return;
        }
        const user = await repository.view(req.body.email);
        // Hash received password
        const passwordIsValid = bcryp.compareSync(req.body.password, user.getPassword());
        if (!passwordIsValid) {
            res.status(401).json({ status: 401, message: "Incorrect credentials" });
            return;
        }

        // Generate authentication token
        const token = jwt.sign({ userId: req.body.email }, sessionTokenSecret, { expiresIn: sessionTokenLifeTime });
        
        // Update authentication token in database
        user.token = token;
        const loggedUser = await repository.update(user);
        res.status(200).json(loggedUser); 
    } catch (error) {
        res.status(204);
    }
};
