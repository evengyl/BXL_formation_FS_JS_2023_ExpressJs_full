const express = require("express")
const router = express.Router()

const routerEmployees = require("./employees.router")
const routerEmployeesSql = require("./employees.sql.router")
const routerComptas = require("./comptas.router")
const routerClients = require("./clients.router")
const routerAuth = require("./auth.router")

router.use("/auth", routerAuth)
router.use("/employees", routerEmployees)
router.use("/employeesSql", routerEmployeesSql)
router.use("/comptas", routerComptas)
router.use("/clients", routerClients)

module.exports = router