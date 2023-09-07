import redisClient from "../models/redis";

export const AuthorizeUserIO = ( socket: any, next: Function) => {
    
    if( !socket.request.session || !socket.request.session.user ){
        console.log("------- BAD -- REQUEST ------");
        
        next(new Error('Not auth'))
    }
    else{
        socket.user = {...socket.request.session.user}
        redisClient.hset(
            `userid:${socket.user.name}`, 
            `userid`,
            socket.user.id)
        next()
    }

}