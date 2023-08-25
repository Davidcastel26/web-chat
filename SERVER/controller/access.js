// const { Request, Response } = require("express")
const Yup = require("yup")

const formSchema = Yup.object({
    username: Yup.string()
        .required("Username requires")
        .min(6, "Username too short not accepted in the server")
        .max(18, "Username too long not accepted in the server"),
    password: Yup.string()
        .required("Password requires")
        .min(6, "Password too short not accepted in the server")
        .max(18, "Password too long not accepted in the server")
})

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
                console.log("form is good in server");
            }
        })
}

module.exports = {
    access
}