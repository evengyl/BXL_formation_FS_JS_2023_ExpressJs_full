const routerComptas = require("express").Router()
const comptaController = require("../controllers/compta.controller")

routerComptas
    .route("/")
        .get(comptaController.getAll)
        .post(comptaController.create)


routerComptas
    .route("/:id")
        .get(comptaController.getOne)
        .put(comptaController.update)
        .delete(comptaController.delete)

module.exports = routerComptas