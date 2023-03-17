const routerEmployeesSql = require("express").Router()
const employeesControllerSql = require("../controllers/employees.sql.controller")

routerEmployeesSql
    .route("/")
        .get(employeesControllerSql.getAll_sql)
        .post(employeesControllerSql.create_sql)

routerEmployeesSql
    .route("/:id")
        .get(employeesControllerSql.getOne_sql)
        .put(employeesControllerSql.update_sql)
        .delete(employeesControllerSql.delete_sql)


module.exports = routerEmployeesSql
