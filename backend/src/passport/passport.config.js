import passport from "passport";
import { GraphQLLocalStrategy } from "graphql-passport";
import userModel from "../DB/models/User.mode.js";
import bcrypt  from "bcryptjs"





const passportConfigure = async ()=>{

passport.serializeUser((user,done)=>{
  console.log("serializeUser");
  done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
  try {
    const user = await userModel.findById(id);
    done(null,user)

  } catch (error) {
    done(error)
  }
})


  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        const user = userModel.findOne({ username });
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

