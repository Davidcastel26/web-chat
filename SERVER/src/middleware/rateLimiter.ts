import { NextFunction, Response } from 'express'
import redisClient from '../models/redis'
import { CustomRequest } from 'ts/interface'


interface resultTypes {
    value :[error: Error,
    result: undefined | number]
}

export const rateLimiter = (
    secondsLimit:number, 
    limitAmount:number
) => async (
    req:   CustomRequest,
    res:   Response,
    next:  NextFunction
) => {

    // normaly we do not do the `.slice` 
    const ip = req.socket.remoteAddress?.slice(0,6)
    // incr = increment
    // const [result] = await redisClient  
    // [ null, 2 ] value is from result array
    const [result] = await redisClient
        .multi()
        .incr(ip)
        .expire(ip, secondsLimit)
        .exec()

    const loginTries = result[1] as number;
    
    if(loginTries > limitAmount) return res.status(403).json({
        loggedIn: false, 
        status:'Carefull you could be blocked'
    })
    else next() 
}