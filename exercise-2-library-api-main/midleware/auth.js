import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN || ""
};

passport.use(new Strategy(options, async (payload, done) => {
    const { type, userId } = payload;
    
    if (!type || type !== "session") {
        return done(null, null);
    }

    return done(null, {userId});
}));

export default passport.authenticate("jwt", {session: false});
