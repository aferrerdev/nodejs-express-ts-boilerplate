import User from "../models/user.model";
import { UserModel } from "../../database/mongo/user.schema";

interface IUserRepository {
    create(user: User): Promise<User>;
    // delete(user: User): User;
    // edit(user: User): User;
}

export default class UserRepository implements IUserRepository {

    public async create(user: User): Promise<User> {
        await UserModel.create({
            name: user.name,
            last_name: user.lastName,
            email: user.email,
            password: user.password
        });
        return user;
    }
}
