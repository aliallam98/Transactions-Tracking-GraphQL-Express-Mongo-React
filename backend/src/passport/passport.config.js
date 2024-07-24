import passport from "passport";
import { GraphQLLocalStrategy } from "graphql-passport";
import userModel from "../DB/models/User.mode.js";

passport.use(
  new GraphQLLocalStrategy(async (username, password, done) => {
    try {
      const user = userModel.findOne({ username });
      if (!user) throw new Error("Invalid username or password");

      const isPasswordMatches = await bcrypt.compare(password, user.password);
      if (!isPasswordMatches) throw new Error("Invalid username or password");

      return done(null, user);
    } catch (error) {
      return done(err);
    }
  })
);
