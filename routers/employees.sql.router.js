const routerEmployeesSql = require("express").Router()
const employeesControllerSql = require("../controllers/employees.sql.controller")
const { bodyValidation, test } = require("../middlewares/body-validation.middleware")
const { paramsValidation } = require("../middlewares/params-validation.middleware")
const { 
    CreateEmployeesValidator,
    GetOneEmployeesValidator,
    UpdateEmployeesValidator
 } = require("../validators/employees.validator")

routerEmployeesSql
    .route("/")
        .get(employeesControllerSql.getAll_sql)
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
