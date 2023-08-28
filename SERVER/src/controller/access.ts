// VALIDATE FORM
// const  formSchema  = require("../helpers/common-formSchema")
import { formSchema, formSchemaLogin } from '../helpers/common-formSchema'
import { Request, Response } from 'express'
// import {formSchema} from '../../common-formSchema'

export const validationsRegister = (req: Request, res: Response) => {

    let formData = req.body

    formSchema
        .validate(formData)
        .catch((err: Error) => {
            res.status(422).send()
            console.log(err + ' ERROR INTO ACCESS SIGN UP FORM SCHEMA');
            
        })
        .then( (valid:any) => {
            if(valid){
                // res.status(200).send()
                console.log("FORM VALIDATION PASS SUCCESFULLY");
            }
        })
}

export const loginValidation = (
    req: Request,
    res: Response
) => {

    let formData = req.body

    formSchemaLogin
        .validate(formData)
        .catch((err: Error) => {
            res.status(422).send()
            console.log(err + ' ERROR INTO ACCESS LOGIN FORM SCHEMA');
            
        })
        .then( (valid:any) => {
            if(valid){
                // res.status(200).send()
                console.log("LOGIN VALIDATION SUCCESFULLY");
            }
        })

}