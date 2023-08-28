import bcryptjs from 'bcryptjs'
import prismadb from '../../models/prismadb'
import {UserInterface} from '../../ts/interface'

const {access} = require("../access")
const {request, response, NextFunction} = require('express')

const salt = bcryptjs.genSaltSync()

export const register = async(
    req: typeof request,
    res: typeof response,
    next: typeof NextFunction
) => {
    
    access(req, res);

    const { name, email, password }: UserInterface = req.body;

    

    try {

        let newUser: UserInterface = {
            name,
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

        if(exsitingUser){

            return res.status(409).json({
                msg:`${newUser.email} and ${newUser.name} is already in use`
            })

        }else{

            const userr = await prismadb.user.create({
                data: { 
                    name: newUser.name,
                    email: newUser.email,
                    password: newUser.password
                }
            })

            req.session.user = { 
                name: userr.name,
                id: userr.idUser

            }
            return res.status(201).json({
                newUser
            })
        }
        
        
    } catch (error) {
        next(error)
    }

}

export const loginUser = async(
    req: typeof request,
    res: typeof response,
    next: typeof NextFunction
) => {

}

export const getAllUsers =async (
    req:  typeof request,
    res:  typeof response,
    next: typeof NextFunction
) => {


    try {
        
        const users = await prismadb.user.findMany()

        res.json({
            msg:'Here all users',
            users
        })
    } catch (error) {
        next(error)
    }
    
}