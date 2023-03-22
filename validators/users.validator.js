const yup = require("yup")

const RegisterUserValidator = yup.object().shape({
    login : yup.string().trim().required().lowercase().min(2).max(20),
    pwd : yup.string().trim().required().min(6).max(25),
})


const AuthUserValidator = yup.object().shape({
    login : yup.string().trim().required().lowercase().min(2).max(20),
    pwd : yup.string().trim().required().min(6).max(25),
})


module.exports = {
    RegisterUserValidator,
    AuthUserValidator
}