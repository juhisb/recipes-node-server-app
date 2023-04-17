import express from 'express';
import cors from 'cors';
import session from 'express-session';
import mongoose from "mongoose";
import * as constants from './constants.js';

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
mongoose.connect(constants.mongo_url, options);

const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000/'
}))

app.set('trust proxy', 1)
app.use(session({
    secret: 'secretKEYabc',
    resave: false,
    name: 'cookieName',
    saveUninitialized: true,
    cookie: {
        secure: true,
        httpOnly: false,
        sameSite: 'none'
    }
}))

app.use(express.json({limit: '50mb'}));

app.get('/', (req, res) => {
    res.send('Welcome to Recipe Node Server!');
});

app.listen(process.env.PORT || 4000);