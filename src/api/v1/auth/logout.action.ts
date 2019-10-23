import { RequestHandler, NextFunction, Request, Response } from "express";

export const logout: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ auth: true });
};
