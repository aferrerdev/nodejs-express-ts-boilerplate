import User from "../models/user.model";
import { UserModel } from "../../database/mongo/user.schema";

interface IUserRepository {
    create(user: User): Promise<User>;
    // delete(user: User): User;
    // edit(user: User): User;
}

export default class UserRepository implements IUserRepository {

    /**
     * Create new user document in mongodb
     * @param {User} user 
     */
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

    public async update(user: User): Promise<User> {
        const result = await UserModel.updateOne({ email: user.email }, {
            name: user.name,
            last_name: user.lastName,
            email: user.email,
            password: user.getPassword(),
            token: user.token
        });
        if (result.ok !== 1) {
            throw new Error("User cannot be updated");
        }
        return user;
    }

    /**
     * Get User from mongodb
     * @param {string} email 
     */
    public async view(email: string): Promise<User> {
        const document = await UserModel.findOne({ email });
        const user = new User();
        user.name = document.get("name");
        user.lastName = document.get("last_name");
        user.email = document.get("email");
        user.token = document.get("token");
        user.setPassword(document.get("password"));
        return user;
    }

    /**
     * Check if user exists in database
     * @param {string} email 
     */
    public async exists(email: string): Promise<boolean> {
        const result = await UserModel.findOne({ email: email });
        return result != null;
    }
}
