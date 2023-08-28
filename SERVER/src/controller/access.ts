// VALIDATE FORM
// const  formSchema  = require("../helpers/common-formSchema")
import { formSchema } from '../helpers/common-formSchema'
import { Request, Response } from 'express'
// import {formSchema} from '../../common-formSchema'

const access = (req: Request, res: Response) => {

    const formData = req.body

    formSchema
        .validate(formData)
        .catch((err: Error) => {
            res.status(422).send()
            console.log(err + ' ERROR EN ACCESS FORM SCHEMA');
            
        })
        .then( (valid:any) => {
            if(valid){
                // res.status(200).send()
                console.log("FORM VALIDATION PASS SUCCESFULLY");
            }
        })
}

module.exports = {
    access
}