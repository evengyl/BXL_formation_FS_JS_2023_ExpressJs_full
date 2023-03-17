const employeesService = require("../services/employees.service")



/*
    Controller recois la demande du router 
    contact son service pour travailler la requete
    et renvoi au CLIENT (RES !!!) les données demandées
*/
const employeesController = {


    getAll : (req, res) => {
        let allEmployees = employeesService.getAll()
        res.json(allEmployees)
    },

    getAll_sql : async (req, res) => {
        let allEmployees = await employeesService.getAll_sql()
        res.json(allEmployees)
    },

    getOne : (req, res, next) => {
        let id = req.params.id

        let oneEmp = employeesService.getOne(id)
        
        if(oneEmp.id != undefined)
        {
            res.json(oneEmp)
        }
        else if(oneEmp.errorMessage != undefined)
        {
            res.locals.message = oneEmp
            next()
        }
        else
        {
            throw new Error("Une Erreur Business interne s'est produite...")
        }
    },


    getOne_sql : async (req, res, next) => {
        let id = req.params.id

        let oneEmp = await employeesService.getOne_sql(id)
        
        if(oneEmp.id != undefined)
        {
            res.json(oneEmp)
        }
        else if(oneEmp.errorMessage != undefined)
        {
            res.locals.message = oneEmp
            next()
        }
        else
        {
            throw new Error("Une Erreur Business interne s'est produite...")
        }
    },

    create : (req, res, next) => {

        //DTO TO MODELS BUSINESS -> Data Transfert Object
        if(req.body.name == undefined || req.body.matricul == undefined 
            || req.body.jobTitle == undefined || req.body.salary == undefined
        )
        {
            throw new Error("Les paramètres du body ne sont pas complet !")
        }

        let newEmp = {
            name : req.body.name,
            matricul : req.body.matricul,
            jobTitle : req.body.jobTitle,
            salary : req.body.salary
        }

        let newEmpCreated = employeesService.create(newEmp)
        
        res.json(newEmpCreated)
    },



    create_sql : async (req, res, next) => {

        //DTO TO MODELS BUSINESS -> Data Transfert Object
        if(req.body.name == undefined || req.body.matricul == undefined 
            || req.body.jobTitle == undefined || req.body.salary == undefined
        )
        {
            throw new Error("Les paramètres du body ne sont pas complet !")
        }

        let newEmp = {
            name : req.body.name,
            matricul : req.body.matricul,
            jobTitle : req.body.jobTitle,
            salary : req.body.salary
        }

        let newEmpCreated = await employeesService.create_sql(newEmp)
        
        res.json(newEmpCreated)
    },

    update : (req, res, next) => {
        let id = req.params.id
        let empToUpdate = employeesService.getOne(id)

        if(empToUpdate.id != undefined)
        {
            if(req.body.name != undefined)
                empToUpdate.name = req.body.name

            if(req.body.matricul != undefined)
                empToUpdate.matricul = req.body.matricul

            if(req.body.jobTitle != undefined)
                empToUpdate.jobTitle = req.body.jobTitle

            if(req.body.salary != undefined)
                empToUpdate.salary = req.body.salary

            let empUpdated = employeesService.update(empToUpdate)
            res.json(empUpdated)
        }
        else if(empToUpdate.errorMessage != undefined)
        {
            res.locals.message = empToUpdate
            next()
        }
        else
        {
            throw new Error("Une Erreur Business interne s'est produite...")
        }
    },


    update_sql : async (req, res, next) => {
        let id = req.params.id
        let empToUpdate = await employeesService.getOne_sql(id)

        if(empToUpdate.id != undefined)
        {
            if(req.body.name != undefined)
                empToUpdate.name = req.body.name

            if(req.body.matricul != undefined)
                empToUpdate.matricul = req.body.matricul

            if(req.body.jobTitle != undefined)
                empToUpdate.jobTitle = req.body.jobTitle

            if(req.body.salary != undefined)
                empToUpdate.salary = req.body.salary

            let empUpdated = await employeesService.update_sql(empToUpdate)
            res.json(empUpdated)
        }
        else if(empToUpdate.errorMessage != undefined)
        {
            res.locals.message = empToUpdate
            next()
        }
        else
        {
            throw new Error("Une Erreur Business interne s'est produite...")
        }
    },

    delete : (req, res, next) => {

        let id = req.params.id
        let empToFired = employeesService.getOne(id)
        
        if(empToFired.id != undefined)
        {
            let empFired = employeesService.delete(empToFired)
            
            if(empFired.id != undefined)
            {
                res.json(empFired)
            }
            else if(empFired.errorMessage != undefined)
            {
                res.locals.message = empFired
                next()
            }
        }
        else if(empToFired.errorMessage != undefined)
        {
            res.locals.message = empToFired
            next()
        }
        else
        {
            throw new Error("Une Erreur Business interne s'est produite...")
        }
    },

    delete_sql : async (req, res, next) => {

        let id = req.params.id
        let empToFired = await employeesService.getOne_sql(id)
        
        if(empToFired.id != undefined)
        {
            let empFired = await employeesService.delete_sql(empToFired)
            
            if(empFired.id != undefined)
            {
                res.json(empFired)
            }
            else if(empFired.errorMessage != undefined)
            {
                res.locals.message = empFired
                next()
            }
        }
        else if(empToFired.errorMessage != undefined)
        {
            res.locals.message = empToFired
            next()
        }
        else
        {
            throw new Error("Une Erreur Business interne s'est produite...")
        }
    }

}

//CRUD -> Create Read Update Delete   ( CRRUD ) Create Read All Read One Update Delete

module.exports = employeesController