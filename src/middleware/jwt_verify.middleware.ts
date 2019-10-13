import { NextFunction, Request, Response, RequestHandler, response } from "express";
import * as jwt from "jsonwebtoken";
import { sessionTokenSecret } from "../config/jwt_session.config";

const excluded = [
    "/v1/users/register",
    "/v1/downloads/android",
    "/v1/downloads/ios"
];

export const JwtVerifyMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    // If path request is in the excluded list continue execution
    if (excluded.includes(req.path)) {
        console.log("Logger middleware");
        next();
    }
    // Otherwise check Authorization headers
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, sessionTokenSecret, (err, decoded: any) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decoded);
                // Searc user in database.
                // req.user = userDataFromDatabase
                next();
            }
        });
    }
    res.status(401).json({ error: "Unathorized" });
};
