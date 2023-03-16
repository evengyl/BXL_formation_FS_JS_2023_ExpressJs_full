const routerClients = require("express").Router()
const clientController = require("../controllers/client.controller")

routerClients
    .route("/")
        .get(clientController.getAll)
        .post(clientController.create)


routerClients
    .route("/:id")
        .get(clientController.getOne)
        .put(clientController.update)
        .delete(clientController.delete)

module.exports = routerClients