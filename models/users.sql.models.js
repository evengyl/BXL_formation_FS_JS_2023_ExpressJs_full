const {getDbConnection} = require("./db")
const mssql = require("mssql")

const usersModelsSql = {

    getAll_sql : async () => {
        const db = await getDbConnection()
        const result = await db.query("select * from users")
        db.close()
        return result.recordset
    },
    
    getOne_sql : async (id) => {
        let db
        try {
            db = await getDbConnection()

            // Requete SQL parametré
            const querySQL = 'SELECT * FROM users WHERE id = @Id'

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

    create_sql : async (newUser) => {

        let db
        try {
            db = await getDbConnection()

            const querySQL = 'INSERT INTO users (login, pwd)'
                + ' OUTPUT inserted.id, inserted.login'
                + ' VALUES (@login, @pwd)'


            const request = new mssql.Request(db)
            request.input('login', mssql.NVarChar, newUser.login)
            request.input('pwd', mssql.NVarChar, newUser.pwd)

            const result = await request.query(querySQL)
            return result.recordset[0]
        }
        finally {
            db?.close()
        }
    },


    getOneByLogin_sql : async(login) => {
        let db
        try {
            db = await getDbConnection()

            // Requete SQL parametré
            const querySQL = 'SELECT * FROM users WHERE login = @login'

            const request = new mssql.Request(db)
            request.input('login', mssql.VarChar, login)

            // Execution de la requete
            const result = await request.query(querySQL)

            if (result.recordset.length == 0) {
                return null
            }
            return result.recordset[0]
        }
        finally {
            db?.close()
        }
    }

}


module.exports = {
    usersModelsSql
}