import { NextFunction, Request, Response } from 'express'
import redisClient from '../models/redis'


export const rateLimiter = (
    secondsLimit:number, 
    limitAmount:number
) => async (
    req:   Request,
    res:   Response,
    next:  NextFunction
) => {

    // normaly we do not do the `.slice` 
    const ip = req.socket.remoteAddress?.slice(0,6)

    // incr = increment
    const [response] = await redisClient
        .multi()
        .incr(ip)
        .expire(ip, secondsLimit)
        .exec()

    console.log(response[1]);  
    
    if(response[1]> limitAmount) return res.status(403).json({
        loggedIn: false, 
        status:'Carefull you could be blocked'
    })
    else next() 
}