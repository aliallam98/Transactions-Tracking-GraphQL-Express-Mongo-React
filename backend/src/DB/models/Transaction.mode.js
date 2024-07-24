import { Schema, models, model, Types } from "mongoose";

const transactionSchema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    description: { type: String, required: true },
    paymentType: { type: String, default: "cash", enum: ["card", "cash"] },
    category: {
      type: String,
      default: "expense",
      enum: ["saving", "expense", "investment"],
    },
    amount: { type: Number, required: true },
    location: { type: String, default: "unknown" },
    date: Date,
  },
  {
    timestamps: true,
  }
);

const transactionModel = models.User || model("Transaction", transactionSchema);

export default transactionModel;
