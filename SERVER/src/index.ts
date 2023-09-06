const express = require('express');
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
io.on('connect', (socket: any) => {
    console.log(socket.id);
    
    console.log(socket.request.session.user.name);
})

server.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
})