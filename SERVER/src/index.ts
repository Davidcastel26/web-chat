const express = require('express');
import { AuthorizeUserIO } from '../src/middleware/socketAuthorizeUser';
import { corsConfig, sessionMiddleware, wrap } from '../src/middleware/serverMiddlewareSession';

const { Server } = require("socket.io")
const helmet = require("helmet")
const cors = require("cors")
import router from './router/authRouter';
const app = express();
const server = require("http").createServer(app)



let port = process.env.PORT || '8080'

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
io.on('connect', (socket: any) => {
    console.log(` --- USER ID --- ${socket.user.friendId}`);
    console.log(socket.request.session.user.name);
})

server.listen(port, () =>{
    console.log(`----- SERVER LISTENING ON PORT ${port} ------`);
})