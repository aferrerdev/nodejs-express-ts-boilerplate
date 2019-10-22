export interface IUser {
    name: string;
    lastName: string;
    email: string;
    token: string;

    getPassword(): string;
    setPassword(password: string): void;
}
