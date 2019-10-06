import { Router } from "express";
import express from "express";

abstract class BaseController {
    public path: string;
    public router: Router = express.Router();

    constructor(basePath: string) {
        this.path = basePath;
        this.initializeRoutes();
    }

    protected abstract initializeRoutes(): any;
}

export default BaseController;
