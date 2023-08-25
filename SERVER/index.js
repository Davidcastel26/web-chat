const express = require("express");
const { Server } = require("socket.io")
const app = express();
const helmet = require("helmet")
const cors = require("cors")
const server = require("http").createServer(app)
const authRouter = require("./router/authRouter")

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

app.get('/', (req, res) => {
    res.json("hey")
})

app.use("/auth", authRouter)

io.on('connect', socket => {

})

server.listen(8080, () =>{
    console.log("Server listening on port 8080");
})