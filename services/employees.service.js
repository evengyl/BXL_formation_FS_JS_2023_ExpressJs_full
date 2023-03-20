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



    getOne : (id) => {
        let oneEmp = employeesModels.getOne(id)

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

    update : (empToUpdate) => {
        let upEmp = employeesModels.update(empToUpdate)
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

}


module.exports = employeesService