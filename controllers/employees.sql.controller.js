const employeesServiceSql = require("../services/employees.sql.service")


const employeesControllerSql = {


    getAll_sql : async (req, res) => {
        let allEmployees = await employeesServiceSql.getAll_sql()
        res.json(allEmployees)
    },

    getOne_sql : async (req, res, next) => {

        let id = req.paramsValidate.id

        let oneEmp = await employeesServiceSql.getOne_sql(id)
        
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

    create_sql : async (req, res, next) => {

        let newEmp = {
            name : req.dataValidate.name,
            matricul : req.dataValidate.matricul,
            jobTitle : req.dataValidate.jobTitle,
            salary : req.dataValidate.salary
        }

        let newEmpCreated = await employeesServiceSql.create_sql(newEmp)
        
        res.json(newEmpCreated)
    },

    update_sql : async (req, res, next) => {
        let id = req.paramsValidate.id
        let empToUpdate = await employeesServiceSql.getOne_sql(id)

        if(empToUpdate.id != undefined)
        {
            if(req.dataValidate.jobTitle != undefined)
                empToUpdate.jobTitle = req.dataValidate.jobTitle

            if(req.dataValidate.salary != undefined)
                empToUpdate.salary = req.dataValidate.salary

            let empUpdated = await employeesServiceSql.update_sql(empToUpdate)
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

   
    delete_sql : async (req, res, next) => {
        let id = req.paramsValidate.id
        let empToFired = await employeesServiceSql.getOne_sql(id)
        
        if(empToFired.id != undefined)
        {
            let empFired = await employeesServiceSql.delete_sql(empToFired)
            
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

module.exports = employeesControllerSql