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

const router: Router = express.Router();

// Auth routes
router.post("/v1/auth/login", login);
router.get("/v1/auth/logout", logout);

// User routes
router.post("/v1/users/register", registerUser);
router.post("/v1/users/view", getUser);

export default router;