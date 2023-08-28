import express from 'express'
const dotenv = require('dotenv')
const { request, response} = require("express");
const { Server } = require("socket.io")
const app = express();
const helmet = require("helmet")
const cors = require("cors")
const authRouter = require("./router/authRouter")
const session = require("express-session")

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
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialzed: false,
    cookie: {
        secure: process.env.environment === "production",
        httpOnly: true,
        sameSite: process.env.environment === "production" ? "none":"lax",
    }
}))

app.get('/', (
    req: typeof request, 
    res: typeof response
) => {
    res.json("hey")
})

app.use("/auth", authRouter)

io.on('connect', (socket: Function) => {

})

server.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
})