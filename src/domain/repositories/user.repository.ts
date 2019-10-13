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
            password: user.getPassword(),
            token: user.token
        });
        return user;
    }

    public async view(email: string): Promise<User> {
        const document = await UserModel.findOne({ email });
        const user = new User();
        user.name = document.get("name");
        user.lastName = document.get("last_name");
        user.email = document.get("email");
        user.token = document.get("token");
        return user;
    }

    public async exists(email: string): Promise<boolean> {
        const result = await UserModel.findOne({ email: email });
        return result != null;
    }
}
