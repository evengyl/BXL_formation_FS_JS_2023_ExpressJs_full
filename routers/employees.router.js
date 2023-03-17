const routerEmployees = require("express").Router()
// same que dans base router but en plus court
//on oublie pas le chainage d'appel de fonctions...
const employeesController = require("../controllers/employees.controller")


/*
    Router dispatch la request au bon endroit
*/


routerEmployees
    .route("/")
        //.get(employeesController.getAll)
        .get(employeesController.getAll_sql)
        //.post(employeesController.create)
        .post(employeesController.create_sql)

        //n'oubliez pas ! pas de parenthèse sur les fct appelée
        //car en réalité on lui donne un nom de callback à appeler lors du match routage !!!

routerEmployees
    .route("/:id") // -> req.params.id
        //.get(employeesController.getOne)
        .get(employeesController.getOne_sql)
        //.put(employeesController.update)
        .put(employeesController.update_sql)
        //.delete(employeesController.delete)
        .delete(employeesController.delete_sql)


module.exports = routerEmployees
