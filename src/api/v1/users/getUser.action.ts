import { RequestHandler, NextFunction, Request, Response } from "express";
import UserRepository from "../../../domain/repositories/user.repository";

export const getUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const repository = new UserRepository();
    res.json(await repository.view(req.body.email));
};
