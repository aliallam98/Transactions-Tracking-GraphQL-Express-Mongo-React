import userModel from "../../DB/models/User.mode.js";
import bcrypt  from "bcryptjs"

const userResolver = {
  Query: {
    authUser:async(_,__,context)=>{
      try {
        const user = await context.getUser()
      } catch (error) {
        console.log("Error in auth user",error);
        throw new Error(error.message);
        
      }
    },
    user:async(_,{userId})=>{
      try {
        const user = await userModel.findById(userId)
        return user
      } catch (error) {
        console.log("Error in user query",error);
        throw new Error(error.message);
      }
    }

    // TODO: Transitions relations
  },
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender)
          throw new Error("All fields are required");

        const isUsernameExists = await userModel.findOne({ username });
        if (isUsernameExists)
          throw new Error("This username is exist try another one");

        const hashedPassword = await bcrypt.hash(password, 8);

        // https://avatar-placeholder.iran.liara.run/
        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = userModel.create({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === "male" ? maleProfilePic : femaleProfilePic,
        });

        await context.login(newUser)
        return newUser;
      } catch (error) {
        console.log("Error in signUp: ", error);
        throw new Error(err.message || "Internal server error");
      }
    },
    logIn: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        if (!username || !password) throw new Error("All fields are required");


        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user);

        return user;
      } catch (error) {
        console.error("Error in login:", err);
        throw new Error(error.message || "Internal server error");
      }
    },
    logOut: async (_,__,context) => {
      try {
        await context.logout();
        req.session.destroy((err)=>{
          if(err) throw err
        })
        res.clearCookie("connect.sid")
        return {message:"Logged out successfully"}
      } catch (error) {
        console.error("Error in logout:", err);
				throw new Error(err.message || "Internal server error");
      }
    },
  },
};

export default userResolver;
