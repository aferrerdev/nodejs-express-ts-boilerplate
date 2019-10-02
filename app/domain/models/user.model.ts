import { IUser } from "../interfaces/user.interface";

export default class User implements IUser {
    email: string;
    name: string;
    lastName: string;
    password?: string;
    token?: string;

    constructor() {

    }
}