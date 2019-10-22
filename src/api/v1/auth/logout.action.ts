import { RequestHandler, NextFunction, Request, Response } from "express";

export const logout: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ auth: true });
};
