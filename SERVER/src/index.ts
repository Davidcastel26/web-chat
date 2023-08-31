import express from 'express'
import session from 'express-session'
const dotenv = require('dotenv')
const { Server } = require("socket.io")
const app = express();
const helmet = require("helmet")
const cors = require("cors")
const authRouter = require("./router/authRouter")
// const session = require("express-session")\

const server = require("http").createServer(app)

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
    // credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT === "production",
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: process.env.ENVIRONMENT === "production" ? "none":"lax",
    }
}))

app.use("/auth", authRouter)


io.on('connect', (socket: Function) => {

})

server.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
})