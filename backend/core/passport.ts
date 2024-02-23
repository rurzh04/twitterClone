import passport from 'passport';
import { Strategy as LocalStratege } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel, UserModelInterface } from '../models/UserModel';
import { generateMD5 } from '../utils/generateHash';

passport.use(
    new LocalStratege(async (username, password, done): Promise<void> => {
        try {
            const user = await UserModel.findOne({
                $or: [{ email: username }, { username }],
            }).exec();

            if (!user) {
                return done(null, false);
            } else {
                if (
                    user.password ===
                    generateMD5(password + process.env.SECRET_KEY)
                ) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }
        } catch (err) {}
    })
);

type User = {
    _id?: number;
};

passport.use(
    new JwtStrategy(
        {
            secretOrKey: process.env.SECRET_KEY || '123',
            jwtFromRequest: ExtractJwt.fromHeader('token'),
        },
        async (payload: { data: UserModelInterface }, done): Promise<void> => {
            try {
                const user = await UserModel.findById(payload.data._id).exec();

                if (user) {
                    return done(null, user);
                }
                done(null, false);
            } catch (error) {
                done(error, false);
            }
        }
    )
);

passport.serializeUser((user: User, done) => {
    console.log(user + 'asd');
    done(null, user?._id);
});

passport.deserializeUser((id, done) => {
    // UserModel.findById(id, (err: any, user: UserModelInterface) => {
    //     done(err, user);
    // });
    UserModel.findById(id);
});

export { passport };
