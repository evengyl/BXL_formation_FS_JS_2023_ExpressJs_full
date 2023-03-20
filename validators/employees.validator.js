const yup = require("yup")

const regxpMatricul = /^^(?=.*[a-z0-9]).+4-(?=.*[a-z0-9]).+3-(?=.*[a-z0-9]).+4$/

const CreateEmployeesValidator = yup.object().shape({
    name : yup.string().trim().required().lowercase().min(2).max(20),
    matricul : yup.string().trim().required().matches(regxpMatricul, "Matricul not correct"),
    jobTitle : yup.string().trim().required().lowercase().min(6).max(100),
    salary : yup.number().required()
})


const GetOneEmployeesValidator = yup.object().shape({
    id : yup.number().integer().positive().required().min(1)
})



const UpdateEmployeesValidator = yup.object().shape({
    jobTitle : yup.string().trim().required().lowercase().min(6).max(100),
    salary : yup.number().required()
})


module.exports = {
    CreateEmployeesValidator,
    GetOneEmployeesValidator,
    UpdateEmployeesValidator
}