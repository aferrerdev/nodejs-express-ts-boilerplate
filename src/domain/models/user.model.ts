import { IUser } from "../interfaces/user.interface";

export default class User implements IUser {
    public email: string;
    public name: string;
    public lastName: string;
    public password?: string;
    public token?: string;
}
