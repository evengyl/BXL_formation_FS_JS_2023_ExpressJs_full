const employeesModelsSql = require("../models/employees.sql.models")

/*
    Service recois le travail du controller
    contact son models pour avoir les datas en db
    manipule le coté BUSINESS totalement 
    et renvoi au controller les données demandées traîtée en mode business
*/
const employeesServiceSql = {
  
    getAll_sql : async () => {

        // return employeesModelsSql.getAll_sql().then((res) => {
        //     return res
        // })

        return await employeesModelsSql.getAll_sql()
    },

   

    getOne_sql : async (id) => {
        let oneEmp = await employeesModelsSql.getOne_sql(id)

        //BAL
        if(oneEmp != undefined)
            return oneEmp
        else
            return { errorMessage : `L'employé numéro : ${id} n'existe pas` }
    },


    create_sql : async (newEmp) => {
        //BAL
        newEmp.fired = false

        let newEmpCreated = await employeesModelsSql.create_sql(newEmp)
        return newEmpCreated
    },

    update_sql : async (empToUpdate) => {
        let upEmp = await employeesModelsSql.update_sql(empToUpdate)
        return upEmp
    },


    delete_sql : async (empToFired) => {

        if(empToFired.fired == false)
        {
            empToFired.fired = true
            let firedEmp = await employeesModelsSql.delete_sql(empToFired)
            return firedEmp
        }
        else
        {
            return { errorMessage : `L'employé numéro : ${empToFired.id} à déjà été licencié...` }
        }
    }
}


module.exports = employeesServiceSql