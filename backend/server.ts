import express from 'express';
import dotenv from 'dotenv';
import bodyParset from 'body-parser';
import multer from 'multer';
const cors = require('cors');
dotenv.config();
// const storage = multer.diskStorage({
//     destination: function (_, file, cb) {
//         cb(null, __dirname + '/dist');
//     },
//     filename: function (_, file, cb) {
//         const ext = file.originalname.split('.').pop();
//         cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
//     },
// });
const uploads = multer({ dest: '/dist' });

import './core/db';
import { registerValidator } from './validations/register';
import { UserControlller } from './controllers/UserControlller';
import { passport } from './core/passport';
import session from 'express-session';
import { TweetControlller } from './controllers/TweetContoller';
import { createTweetValidator } from './validations/createTweet';
import { UploadFileCtrl } from './controllers/UploadFileController';
const app = express();

const port = process.env.PORT || 8888;
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParset.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: String(process.env.SECRET_KEY),
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('hello');
});
app.get('/users', UserControlller.index);
app.get(
    '/users/me',
    passport.authenticate('jwt', { session: false }),
    UserControlller.getUserInfo
);
app.get('/users/:id', UserControlller.show);
app.get('/auth/verify', registerValidator, UserControlller.verify);
app.post('/auth/register', registerValidator, UserControlller.create);
app.post(
    '/auth/login',
    passport.authenticate('local'),
    UserControlller.afterLogin
);

// tweet
app.get('/tweets', TweetControlller.index);
app.get('/tweets/:id', TweetControlller.show);
app.delete(
    '/tweets/:id',

    TweetControlller.delete
);
app.patch('/tweets/:id', passport.authenticate('jwt'), TweetControlller.update);
app.post(
    '/tweets',
    passport.authenticate('jwt'),
    createTweetValidator,
    TweetControlller.create
);

app.post('/upload', uploads.single('image'), UploadFileCtrl.upload);

app.listen(port, (): void => {
    console.log(`Server Started ${port}`);
});
