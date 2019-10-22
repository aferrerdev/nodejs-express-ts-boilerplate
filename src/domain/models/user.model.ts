import { IUser } from "../interfaces/user.interface";

export default class User implements IUser {
    public email: string;
    public name: string;
    public lastName: string;
    public token: string;

    private password: string;

    public setPassword(password: string) {
        this.password = password;
    }

    public getPassword() {
        return this.password;
    }
}
