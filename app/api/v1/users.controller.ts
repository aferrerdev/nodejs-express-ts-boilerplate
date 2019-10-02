import { Request, Response, NextFunction } from 'express';
import BaseController from '../base.controller';

class UsersController extends BaseController {

    constructor() {
        super('/v1/users');
    }

    protected initializeRoutes() {
        this.router.get(this.path+'/register', this.registerUser);
    }

    registerUser(req: Request, res: Response, next: NextFunction) {
        res.send('registerUser');
    }
}

export default UsersController;