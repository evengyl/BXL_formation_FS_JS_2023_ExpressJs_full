const employeesService = require("../services/employees.service")

const docController = {

    getHome : (req, res, next) => {
        res.render("index.ejs", { page : "pages/home.ejs" })
    },

    getEmployees : (req, res, next) => {
        let allEmployees = employeesService.getAll()
        res.render("index.ejs", { page : "pages/allEmp.ejs", allEmployees })
    },

    getDocRestEmployees : (req, res, next) => {
        res.render("index.ejs", { page : "pages/restEmp.ejs" })
    }
}


module.exports = docController