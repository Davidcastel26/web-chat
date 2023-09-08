import redisClient from "../models/redis";

export const AuthorizeUserIO = ( socket: any, next: Function) => {
    
    if( !socket.request.session || !socket.request.session.user ){
        console.log("------- BAD -- REQUEST ------");
        
        next(new Error('Not auth'))
    }
    else{
        next()
    }

}

export const InitializeUser = (socket:any) => {
    socket.user = {...socket.request.session.user}
    redisClient.hset(
        `friendId:${socket.user.name}`, 
        "friendId",
        socket.user.friendId);
    console.log(
        ` --- USER ID : ${socket.user.friendId}`,
        `/ username ${socket.user.name}`
    );
}

export const addFriend = async(socket:any, friendName: string, cb: Function ) => {

    // console.log('------', friendName, '-------------');
    //
    if(friendName === socket.user.name){
        console.log('CANNOT---ADD---YOURSELF');
        cb({
            done: false, 
            errorMessage:'CANNOT---ADD---YOURSELF!'
        })
    } 
    //here we are setting the looking for the friend in our session
    const friendUiserId  = await redisClient.hget(
        `userId: ${socket.user.name}`,
        'friendId'
    )
    console.log(friendUiserId);
    
    if(!friendUiserId) {

        return cb({
            done: false, 
            errorMessage:'USER-DOES-NOT-EXIST!'
        })
        
    }

    const currentFriendList = await redisClient.lrange(
        `friends:${friendName}`,
        0,
        -1
    )

    if( currentFriendList && currentFriendList.indexOf(friendName) !== -1){

        console.log('------ Friend ', friendName, 'already in your LIST-------------');
        cb({
            done: false, 
            errorMessage:'USER-ALREADY-IN-YOUR-LIST!'
        })
        return

    }
    // else{

        await redisClient.lpush(`friends: ${socket.user.name}`,  friendName)
        console.log('------', friendName, '-------------');
        console.log(friendUiserId);
        return cb({
            done: true
        })

    // }
}  