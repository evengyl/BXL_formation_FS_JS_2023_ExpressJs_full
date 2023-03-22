const routerEmployeesSql = require("express").Router()
const employeesControllerSql = require("../controllers/employees.sql.controller")
const { bodyValidation, test } = require("../middlewares/body-validation.middleware")
const { paramsValidation } = require("../middlewares/params-validation.middleware")
const { 
    CreateEmployeesValidator,
    GetOneEmployeesValidator,
    UpdateEmployeesValidator
 } = require("../validators/employees.validator")
 const { authJwt } = require("../middlewares/auth.middleware")

routerEmployeesSql
    .route("/")
        .get(authJwt("admin"), employeesControllerSql.getAll_sql)
        .post(test, bodyValidation(CreateEmployeesValidator), employeesControllerSql.create_sql)

routerEmployeesSql
    .route("/:id")
        .get(paramsValidation(GetOneEmployeesValidator), employeesControllerSql.getOne_sql)
        .put(
            paramsValidation(GetOneEmployeesValidator), 
            bodyValidation(UpdateEmployeesValidator), 
            employeesControllerSql.update_sql
        )
        .delete(paramsValidation(GetOneEmployeesValidator), employeesControllerSql.delete_sql)


module.exports = routerEmployeesSql
