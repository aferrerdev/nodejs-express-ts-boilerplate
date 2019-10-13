import { Schema } from "mongoose";
import mongoose from "mongoose";

class UserSchema extends Schema {
    constructor() {
        super({
            email: String,
            name: String,
            last_name: String,
            password: String,
            token: String
        });
    }
}
export const UserModel = mongoose.model("User", new UserSchema());
