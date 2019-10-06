import { Schema } from "mongoose";
import mongoose from "mongoose";

class TransactionSchema extends Schema {
    constructor() {
        super({
            name: String,
            amount: Number,
            type: ["INCOME", "EXPENSE"],
            recurring_period: ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]
        });
    }
}

export const TransactionModel = mongoose.model("Transaction", new TransactionSchema());
