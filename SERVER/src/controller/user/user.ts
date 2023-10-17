import bcryptjs from 'bcryptjs'
import prismadb from '../../models/prismadb'
import { UserInterface, CustomRequest } from '../../ts/interface';
import { 
     loginValidation,
     validationsRegister } from '../../middleware/access'
import { rateLimiter } from '../../middleware/rateLimiter';
import {Request, Response, NextFunction} from 'express'

const salt = bcryptjs.genSaltSync()

export const register = async(
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    
    // rateLimiter(req, res, next);

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
                id: userr.idUser,
                friendId: userr.friendId
            }

            validationsRegister(req, res, next);

            return res.status(201).json({
                loggedIn: true,
                newUser
            })
        }
        
        
    } catch (error) {

        next(error)

        return res.status(500).json({
            msg:'Go with admin'
        })
    }

}

export const loginUser = async(
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {

    // console.log(req.session);
    // rateLimiter(req, res, next)

    const { name, password } = req.body

    try {

        const potentialLogin = await prismadb.user.findFirst({
            where:{
                name
            }
        })

        if(!potentialLogin){

            return res.status(400).json({msg:'Username / Pass are not correct'})

        }

        const isValidPass = await bcryptjs.compareSync(
            password, 
            potentialLogin.password
        )
    
        if(!isValidPass){
            return res.status(400).json({msg:'Username / Pass are not correct'})
        }

        req.session.user = {
            name: potentialLogin.name,
            id: potentialLogin.idUser,
            friendId: potentialLogin.friendId
        }

        
        // rateLimiter(60, 10)
        loginValidation(req, res, next)

        return res.status(200).json({
            loggedIn: true,
            user: potentialLogin.name
        })
    
    

    } catch (error) {
        next(error)  
    }

    
}

export const userLogin = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {

    const loggedUser = req.session

    // console.log(loggedUser);
    

    try {
        if(loggedUser.user && loggedUser.user.name) {
            res.status(200).json({
                loggedIn: true,
                name: loggedUser.user.name
            })
        }else{
            res.json({ loggedIn: false })
        }

    } catch (error) {
        next(error)
    }
}

export const getAllUsers =async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
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

