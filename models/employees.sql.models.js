const {getDbConnection} = require("./db")
const mssql = require("mssql")

const employeesModelsSql = {

    getAll_sql : async () => {
        const db = await getDbConnection()
        const result = await db.query("select * from employees")
        db.close()
        return result.recordset
    },
    
    getOne_sql : async (id) => {
        let db
        try {
            db = await getDbConnection()

            // Requete SQL parametré
            const querySQL = 'SELECT * FROM employees WHERE id = @Id'

            const request = new mssql.Request(db)
            request.input('Id', mssql.Int, id)

            // Execution de la requete
            const result = await request.query(querySQL)

            if (result.recordset.length !== 1) {
                return null
            }
            return result.recordset[0]
        }
        finally {
            db?.close()
        }
    },

    create_sql : async (newEmp) => {

        let db
        try {
            db = await getDbConnection()
            //id, name, matricul, jobTitle, salary, fired
            // Protection contre l'injection SQL => Pas de concatenation !
            const querySQL = 'INSERT INTO employees (name, matricul, jobTitle, salary, fired)'
                + ' OUTPUT inserted.id'
                + ' VALUES (@name, @matricul, @jobTitle, @salary, @fired)'

            // Requete sécurisé: Ajout de parametres pour envoyer les données sensible
            const request = new mssql.Request(db)
            request.input('name', mssql.NVarChar, newEmp.name)
            request.input('matricul', mssql.NVarChar, newEmp.matricul)
            request.input('jobTitle', mssql.NVarChar, newEmp.jobTitle)
            request.input('salary', mssql.NVarChar, newEmp.salary)
            request.input('fired', mssql.Bit, newEmp.fired)

            const result = await request.query(querySQL)
            return result.recordset[0]
        }
        finally {
            db?.close()
        }
    },


    update_sql : async (empToUpdate) => {
        let db
        try {
            db = await getDbConnection()
            //id, name, matricul, jobTitle, salary, fired
            // Protection contre l'injection SQL => Pas de concatenation !
            const querySQL = 'UPDATE employees '
                + ' SET name = @name, matricul = @matricul, jobTitle = @jobTitle, salary = @salary '
                + ' OUTPUT inserted.id '
                + ' WHERE id = @id '
               

            // Requete sécurisé: Ajout de parametres pour envoyer les données sensible
            const request = new mssql.Request(db)
            request.input('name', mssql.NVarChar, empToUpdate.name)
            request.input('matricul', mssql.NVarChar, empToUpdate.matricul)
            request.input('jobTitle', mssql.NVarChar, empToUpdate.jobTitle)
            request.input('salary', mssql.NVarChar, empToUpdate.salary)
            request.input('id', mssql.Int, empToUpdate.id)

            const result = await request.query(querySQL)
            return result.recordset[0]
        }
        finally {
            db?.close()
        }
    },


    delete_sql : async (empToFired) => {
        let db
        try {
            db = await getDbConnection()
            //id, name, matricul, jobTitle, salary, fired
            // Protection contre l'injection SQL => Pas de concatenation !
            const querySQL = 'UPDATE employees '
                + ' SET fired = @fired '
                + ' OUTPUT inserted.id '
                + ' WHERE id = @id '
               

            // Requete sécurisé: Ajout de parametres pour envoyer les données sensible
            const request = new mssql.Request(db)
            request.input('fired', mssql.Bit, false)
            request.input('id', mssql.Int, empToFired.id)

            const result = await request.query(querySQL)
            return result.recordset[0]
        }
        finally {
            db?.close()
        }
    }
}


module.exports = employeesModelsSql