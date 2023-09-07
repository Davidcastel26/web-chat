// const session = require('express-session');
const RedisStore = require("connect-redis").default;
import session from 'express-session';
import { createClient } from 'redis';
const dotenv = require('dotenv')
export const redisClient = createClient();
dotenv.config()

redisClient.connect().catch(console.error);

export const sessionStore = new RedisStore({ client: redisClient });

redisClient.on('error', (err: Error)=>{
    console.log("----- REDIS ERROR ----", err);  
})


redisClient.on('connect',(err:Error)=> {
    console.log('----- CONNECTED TO REDIS SUCCESFULLY -----');
})

export const sessionMiddleware = session({
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
})

export const wrap = ( expressMiddleware:any) => (socket:any, next:Function) => 
    expressMiddleware(socket.request, {}, next)

export const corsConfig = {
    origin:"http://localhost:5173",
    credentials: true
}