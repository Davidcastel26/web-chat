import express from 'express'
import { Server, Socket }  from "socket.io"
import helmet from "helmet"
import cors from "cors"
import router from './router/authRouter';

import { AuthorizeUserIO, InitializeUser, addFriend } from '../src/middleware/socketAuthorizeUser';
import { corsConfig, sessionMiddleware, wrap } from '../src/middleware/serverMiddlewareSession';

const app = express();
const server = require("http").createServer(app)

const port = process.env.PORT || '8080'

const io = new Server( server, {
    cors: corsConfig
})

app.use(helmet());
app.use(cors(corsConfig))
app.use(express.json());
app.use( sessionMiddleware )
app.use("/auth", router)

io.use(wrap(sessionMiddleware))
io.use(AuthorizeUserIO)
io.on('connect', (socket: Socket) => {
    InitializeUser(socket)
    socket.on('client:add_friend', (name:string, cb:Function) =>{
        addFriend(socket, name, cb)
    })
    // .then( () => {
    // })
})

server.listen(port, () =>{
    console.log(`----- SERVER LISTENING ON PORT ${port} ------`);
})