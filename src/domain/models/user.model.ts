import { IUser } from "../interfaces/user.interface";

export default class User implements IUser {
    public email: string;
    public name: string;
    public lastName: string;
    private password?: string;
    public token?: string;

    public setPassword(password: string) {
        this.password = password;
    }

    public getPassword() {
        return this.password;
    }
}
