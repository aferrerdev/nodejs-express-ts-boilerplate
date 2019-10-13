
import mongoose from "mongoose";
import "dotenv/config";
import { UserModel } from "../database/mongo/user.schema";

export default class MongoDbConnection {

    public connect() {
        // Load configuration from .env file
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Initialize events
        mongoose.connection.on("connected", this.onConnected);
        mongoose.connection.on("error", this.onError);
        mongoose.connection.on("disconnected", this.onDisconnect);
    }

    private onConnected() {
        console.log("Connected to mongodb");
    }

    private onError() {
        console.log("Error connecting to mongodb");
    }

    private onDisconnect() {
        console.log("Disconnected from mongo");
    }
}
