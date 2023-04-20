import express from 'express';
import cors from 'cors';
import session from 'express-session';
import mongoose from "mongoose";
import * as constants from './constants.js';
import UsersController from "./controllers/users-controller.js";
import ReviewerController from "./controllers/reviewer-controller.js";
import AdminController from "./controllers/admin-controller.js";
import ReviewController from "./controllers/review-controller.js";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false,
    maxPoolSize: 10,
    socketTimeoutMS: 45000,
    family: 4
}

console.log(constants.mongo_url);
mongoose.connect(constants.mongo_url);

const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.set('trust proxy', 1)
app.use(session({
    secret: 'secretKEYabc',
    resave: false,
    saveUninitialized: true,
    // name: 'cookieName',
    // cookie: {
    //     secure: true,
    //     httpOnly: false,
    //     sameSite: 'none'
    // }
}))

app.use(express.json({limit: '50mb'}));

app.get('/', (req, res) => {
    res.send('Welcome to Recipe Node Server!');
});

UsersController(app);
ReviewerController(app);
AdminController(app);
ReviewController(app);
app.listen(process.env.PORT || 4000);