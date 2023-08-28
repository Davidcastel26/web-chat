import bcryptjs from 'bcryptjs'
import prismadb from '../../models/prismadb'
import {User} from '../../ts/interface'

const {access} = require("../access")
const {request, response, NextFunction} = require('express')

const salt = bcryptjs.genSaltSync()

export const postUser = async(
    req: typeof request,
    res: typeof response,
    next: typeof NextFunction
) => {
    
    access(req, res);

    const { username, email, password } = req.body;

    try {

        const newUser: User = {
            name: username,
            email,
            password
        }

        newUser.password = bcryptjs.hashSync(password, salt)

        const exsitingUser = await prismadb.user.findFirst({
            where:{
                email: newUser.email,
                name: newUser.name
            }
        })

        if(exsitingUser.email || exsitingUser.name){

            return res.status(409).json({
                msg:`${newUser.email} and ${newUser.name} is already in use`
            })

        }else{

            await prismadb.user.create({
                data: { 
                    name: newUser.name,
                    email: newUser.email,
                    password: newUser.password
                }
            })

            return res.status(201).json({
                newUser
            })
        }
        
        
    } catch (error) {
        next(error)
    }

}