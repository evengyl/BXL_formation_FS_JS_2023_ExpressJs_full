const routerEmployees = require("express").Router()
// same que dans base router but en plus court
//on oublie pas le chainage d'appel de fonctions...
const employeesController = require("../controllers/employees.controller")


/*
    Router dispatch la request au bon endroit
*/


routerEmployees
    .route("/")
        .get(employeesController.getAll)
        .post(employeesController.create)

        //n'oubliez pas ! pas de parenthèse sur les fct appelée
        //car en réalité on lui donne un nom de callback à appeler lors du match routage !!!

routerEmployees
    .route("/:id") // -> req.params.id
        .get(employeesController.getOne)
        .put(employeesController.update)
        .delete(employeesController.delete)


module.exports = routerEmployees
