import { Router } from "express";
import express from "express";

// User requests
import { 
    registerUser,
    getUser
 } from  "./api/v1/users/actions";

// Auth requests
import { 
    login, 
    logout 
} from  "./api/v1/auth/actions";

export default class AppRoutes {
    public router: Router = express.Router();

    install() {
        // Auth routes
        this.router.post("/v1/auth/login", login);
        this.router.get("/v1/auth/logout", logout);

        // User routes
        this.router.post("/v1/users/register", registerUser);
        this.router.post("/v1/users/view", getUser);
    }
}