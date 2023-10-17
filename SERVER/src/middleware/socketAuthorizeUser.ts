import { Socket } from "socket.io";
import redisClient from "../models/redis";
import { CustomSocket } from "ts/interface";

export const AuthorizeUserIO = ( socket: any, next: Function) => {
    
    if( !socket.request.session || !socket.request.session.user ){
        console.log("------- BAD -- REQUEST ------");
        
        next(new Error('Not auth'))
    }
    else{
        next()
    }

}

export const InitializeUser = async(socket:any) => {
    socket.user = {...socket.request.session.user}

    // console.log(socket.user)
    // console.log(socket.request.session)

    //HSET = goes into our redis and it sets/creates a hashmap 
    //first argument is the name of the hashmap/key
    //second argument takes a field
    //third argument is a value
    await redisClient.hset(
        `friendId:${socket.user.name}`, 
        "friendId",
        socket.user.friendId
    );
    console.log(
        ` --- USER ID : ${socket.user.friendId}`,
        `/ username ${socket.user.name}`
    );
}

export const addFriend = async(socket:any, name: string, cb: Function ) => {

    console.log('------', name, '-------------');
    // console.log('------', socket.user.name, '-------------');

    if(name === socket.user.name){
        console.log('---- CANNOT---ADD---YOURSELF ---');
        cb({
            done: false, 
            errorMessage:'CANNOT---ADD---YOURSELF!'
        })
    } 
    //here we are setting the looking for the friend in our session
    //frist argument is the key hast variable
    //second argument is the name of the field
    const friendUiserId  = await redisClient.hget(
        `friendId:${name}`,
        'friendId'
    )

    // console.log('------ NULL ----- ',typeof friendUiserId); //object
    console.log('------ NULL ----- ', friendUiserId); //null
    

    const currentFriendList = await redisClient.lrange(
        `friends:${socket.user.name}`,
        0,
        -1
    )

    if( currentFriendList && currentFriendList.indexOf(name) !== -1){

        console.log('------ Friend ', name, 'already in your LIST-------------');
        cb({
            done: false, 
            errorMessage:'USER-ALREADY-IN-YOUR-LIST!'
        })
        return

    }

    if(!friendUiserId) {

        return cb({
            done: false, 
            errorMessage:'USER-DOES-NOT-EXIST!'
        })
        
    }
    // // else{

        await redisClient.lpush(`friends:${socket.user.name}`,  name)
        // console.log('------', name, '-------------');
        console.log('-----FRIEND--ADDED---SUCESSFULLY----',friendUiserId);
        cb({
            done: true
        })

    // }
    // next()
}  