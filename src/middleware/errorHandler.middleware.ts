import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export const ErrorHandlerMiddleware: ErrorRequestHandler = 
(err: any, req: Request, res: Response, next: NextFunction): any => {
    // Check environment
    switch (req.app.get("env")) {
        case "development":
            console.log("Error Handler triggered!!!");
            console.log(err);
            return res.status(err.status).json(err);
        case "production":
            return res.status(err.status).json(err);
    }
};
