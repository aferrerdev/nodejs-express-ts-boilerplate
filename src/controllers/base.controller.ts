import { Router } from "express";
import express from "express";

abstract class BaseController {
    public router: Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    protected abstract initializeRoutes(): any;
}

export default BaseController;
