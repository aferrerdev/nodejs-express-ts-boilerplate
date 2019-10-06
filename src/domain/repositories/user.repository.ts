import User from "../models/user.model";
import { UserModel } from "../../database/mongo/user.schema";

interface IUserRepository {
    create(user: User): User;
    // delete(user: User): User;
    // edit(user: User): User;
}

export default class UserRepository implements IUserRepository {

    public create(user: User): User {
        UserModel.create({
            name
        })
    }
}
