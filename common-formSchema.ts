import * as Yup  from 'yup';
// const { Yup } = require("yup")

export const formSchema = Yup.object({
    name: Yup.string()
        .required("Username requires")
        .min(6, "Username too short not accepted in the server")
        .max(18, "Username too long not accepted in the server"),
    email: Yup.string()
        .required("Email requires")
        .min(6, "Email too short not accepted in the server")
        .max(18, "Email too long not accepted in the server"),
    password: Yup.string()
        .required("Password requires")
        .min(6, "Password too short not accepted in the server")
        .max(18, "Password too long not accepted in the server")
})


export const formSchema4Login = Yup.object({
    name: Yup.string()
        .required("Username requires")
        .min(6, "Username too short not accepted in the server")
        .max(18, "Username too long not accepted in the server"),
    password: Yup.string()
        .required("Password requires")
        .min(6, "Password too short not accepted in the server")
        .max(18, "Password too long not accepted in the server")
})

export const friendSchema = Yup.object({
    name: Yup.string()
        .required("Friend name is required")
        .min(2, "too short not accepted")
        .max(12, 'invalid friend name')
})
