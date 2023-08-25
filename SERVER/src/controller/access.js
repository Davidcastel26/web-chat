// VALIDATE FORM
const { formSchema } = require("../helpers/common-formSchema")
// import {formSchema} from '../../common-formSchema'
import { prismadb} from '../models/prismadb'

const access = (req, res) => {

    const formData = req.body

    formSchema
        .validate(formData)
        .catch(err => {
            res.status(422).send()
            console.log(err.errors);
        })
        .then( valid => {
            if(valid){
                res.status(200).send()
                console.log("form is good in server");
            }
        })
}

module.exports = {
    access
}