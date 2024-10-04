import mongoose,{ Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    profileImage: { type: String, required: true },
    gender: { type: String, default: "male", enum: ["male", "female"] },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose?.models.User || model("User",userSchema)

export default userModel