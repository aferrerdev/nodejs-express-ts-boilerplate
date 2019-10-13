import { Router } from "express";
import express from "express";

abstract class BaseController {
    public router: Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    /**
     * All routes of the controller should be initialized
     * to the router
     */
    protected abstract initializeRoutes(): any;
}

export default BaseController;
