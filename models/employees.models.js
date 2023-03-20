const employees = require("../datas/employees.json")
const {getDbConnection} = require("./db")
const mssql = require("mssql")

const employeesModels = {


    
    getAll : () => {
        return [...employees]
    },

    getOne : (id) => {
        return employees.find(emp => emp.id == id)
    },

  

    create : (newEmp) => {

        let uuid = employees.length+1
        newEmp.id = uuid
        employees.push(newEmp)
        //simulation du save db (push) -> on ne retourne pas le newEmp !!! on retourne le newEmp venant de la db !!!
        let empCreated = employees.find(emp => emp.id == uuid)
        return empCreated
    },

   

    update : (empToUpdate) => {
        let indexEmp = employees.findIndex(emp => emp.id == empToUpdate.id)
        
        employees[indexEmp] = empToUpdate
        return employees[indexEmp]
    },


    delete : (empToFired) => {
        let indexEmp = employees.findIndex(emp => emp.id == empToFired.id)
        
        employees[indexEmp] = empToFired
        return employees[indexEmp]
    },

}


module.exports = employeesModels