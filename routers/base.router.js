const express = require("express")
const router = express.Router()

const routerEmployees = require("./employees.router")
const routerComptas = require("./comptas.router")
const routerClients = require("./clients.router")

router.use("/employees", routerEmployees)
router.use("/comptas", routerComptas)
router.use("/clients", routerClients)

module.exports = router