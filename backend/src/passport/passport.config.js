import passport from "passport";
import { GraphQLLocalStrategy } from "graphql-passport";
import userModel from "../DB/models/User.mode.js";
import bcrypt  from "bcryptjs"





const passportConfigure = async ()=>{

  passport.serializeUser(async(user, done) => {
		console.log("Serializing user");
    console.log("user", user);
    
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		console.log("Deserializing user");
		try {
			const user = await userModel.findById(id);
			done(null, user);
		} catch (err) {
			done(err);
		}
	});


  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = await userModel.findOne({ username });
        if (!user) throw new Error("Invalid username or password");
  
        const isPasswordMatches = await bcrypt.compare(password, user.password);
        if (!isPasswordMatches) throw new Error("Invalid username or password");
  
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
}

export default passportConfigure

