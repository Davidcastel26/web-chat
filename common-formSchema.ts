import * as Yup  from 'yup';
// const { Yup } = require("yup")

export const formSchema = Yup.object({
    username: Yup.string()
        .required("Username requires")
        .min(6, "Username too short not accepted in the server")
        .max(18, "Username too long not accepted in the server"),
    password: Yup.string()
        .required("Password requires")
        .min(6, "Password too short not accepted in the server")
        .max(18, "Password too long not accepted in the server")
})

// module.exports = {
//     formSchema
// }