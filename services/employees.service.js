const employeesModels = require("../models/employees.models")

/*
    Service recois le travail du controller
    contact son models pour avoir les datas en db
    manipule le coté BUSINESS totalement 
    et renvoi au controller les données demandées traîtée en mode business
*/
const employeesService = {
    
    getAll : async () => {
        let allEmp = await employeesModels.getAll()
        return allEmp
    },


    getAll_sql : () => {
        let allEmp = employeesModels.getAll_sql()
        return allEmp
    },

    getOne : (id) => {
        let oneEmp = employeesModels.getOne(id)

        //BAL
        if(oneEmp != undefined)
            return oneEmp
        else
            return { errorMessage : `L'employé numéro : ${id} n'existe pas` }
    },


    getOne_sql : async (id) => {
        let oneEmp = await employeesModels.getOne_sql(id)

        //BAL
        if(oneEmp != undefined)
            return oneEmp
        else
            return { errorMessage : `L'employé numéro : ${id} n'existe pas` }
    },

    create : (newEmp) => {
        //BAL
        newEmp.fired = false

        let newEmpCreated = employeesModels.create(newEmp)
        return newEmpCreated
    },



    create_sql : async (newEmp) => {
        //BAL
        newEmp.fired = false

        let newEmpCreated = await employeesModels.create_sql(newEmp)
        return newEmpCreated
    },

    update : (empToUpdate) => {
        let upEmp = employeesModels.update(empToUpdate)
        return upEmp
    },

    update_sql : async (empToUpdate) => {
        let upEmp = await employeesModels.update_sql(empToUpdate)
        return upEmp
    },

    delete : (empToFired) => {

        if(empToFired.fired == false)
        {
            empToFired.fired = true
            let firedEmp = employeesModels.delete(empToFired)
            return firedEmp
        }
        else
        {
            return { errorMessage : `L'employé numéro : ${empToFired.id} à déjà été licencié...` }
        }
    },

    delete_sql : async (empToFired) => {

        if(empToFired.fired == false)
        {
            empToFired.fired = true
            let firedEmp = await employeesModels.delete_sql(empToFired)
            return firedEmp
        }
        else
        {
            return { errorMessage : `L'employé numéro : ${empToFired.id} à déjà été licencié...` }
        }
    }
}


module.exports = employeesService