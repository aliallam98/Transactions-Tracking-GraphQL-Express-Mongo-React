import mongoose from "mongoose";

export const connectToDB = async () => {
  return await mongoose
    .connect(process.env.DB_ATLAS_URL)
    .then(() => console.log("DB is connected"))
    .catch(() => console.log("Something went wrong in db connection"));
};


export default connectToDB