const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv')
const { Server } = require("socket.io")
const helmet = require("helmet")
const cors = require("cors")

import { createClient } from 'redis';
const app = express();

import router from './router/authRouter';

const RedisStore = require("connect-redis").default;

// const RedisStore = connectRedis(session)
// const redisClient = new Redis({ host: 'localhost', port: 6379});
// const redisClient = redis.createClient({ host: 'localhost', port: 6379});
// const redisClient = redis.createClient({ host: 'localhost', port: 6379});

const redisClient = createClient();
redisClient.connect().catch(console.error);
const sessionStore = new RedisStore({ client: redisClient });

const server = require("http").createServer(app)

redisClient.on('error', (err: Error)=>{
    console.log("REDIS ERROR", err);  
})


redisClient.on('connect',(err:Error)=> {
    console.log('CONNECTED TO REDIS SUCCESFULLY');
})

dotenv.config()

let port = process.env.PORT || '8080'

const io = new Server( server, {
    cors:{
        origin:"http://localhost:5173",
        credentials: true
    }
})


app.use(helmet());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))
app.use(express.json());
app.use( session({
    secret: process.env.COOKIE_SECRET,
    name: "sid",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT === "production",
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: process.env.ENVIRONMENT === "production" ? "none":"lax",
    }
}))

app.use("/auth", router)


io.on('connect', (socket: Function) => {

})

server.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
})