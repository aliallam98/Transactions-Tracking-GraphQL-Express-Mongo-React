import userModel from "../../DB/models/User.mode.js";

const userResolver = {
  Query: {},
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender)
          throw new Error("All fields are required");

        const isUsernameExist = await userModel.findOne({ username });
        if (isUsernameExist)
          throw new Error("This username is exist try another one");

        const hashedPassword = await bcrypt.hashSync(password, 8);

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
    logOut: async (_,_,context) => {
      try {
        await context.logout();
      } catch (error) {
        console.error("Error in logout:", err);
				throw new Error(err.message || "Internal server error");
      }
    },
  },
};

export default userResolver;
