import { Router } from "express";
import express from 'express';

abstract class BaseController {
    public path: string;
    public router: Router = express.Router();
    
    protected abstract initializeRoutes(): any;

    constructor(basePath: string) {
        this.path = basePath;
        this.initializeRoutes();
    }
}

export default BaseController;