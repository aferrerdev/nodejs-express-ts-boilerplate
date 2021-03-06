import { NextFunction, Request, Response, RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import { sessionTokenSecret } from "../config/jwt.config";
import { ErrorResponse } from "./messages";

const excluded = [
    "/v1/users/register",
    "/v1/users/view",
    "/v1/downloads/android",
    "/v1/downloads/ios",
    "/v1/auth/login"
];

export const JwtVerificationMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    // If path request is in the excluded list continue execution
    if (excluded.includes(req.path)) {
        console.log("Logger middleware");
        next();
    } else {
        // Otherwise check Authorization headers
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, sessionTokenSecret, (err, decoded: any) => {
                if (err) {
                    console.log(err);
                    next(ErrorResponse.Unauthorized());
                } else {
                    console.log(decoded);
                    // Searc user in database.
                    // req.user = userDataFromDatabase
                    // Request can continue to next controller
                    next();
                }
            });
        } else {
            next(ErrorResponse.Unauthorized());
        }
    }
    
};
