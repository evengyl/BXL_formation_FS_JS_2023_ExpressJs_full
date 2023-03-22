const {usersModelsSql} = require("../models/users.sql.models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const authServiceSql = {
  
    getAll_sql : async () => {

        return await usersModelsSql.getAll_sql()
    },

    getOne_sql : async (id) => {
        let oneUser = await usersModelsSql.getOne_sql(id)

        if(oneUser != undefined)
            return oneUser
        else
            return { errorMessage : `Le user numéro : ${id} n'existe pas` }
    },

    create_sql : async (newUser) => {
        const saltRounds = 10;
        newUser.pwd = await bcrypt.hash(newUser.pwd, saltRounds)
        let userIdCreated = await usersModelsSql.create_sql(newUser)

        
        return userIdCreated
    },




    getOneByLogin_sql : async (login) => {

        let oneUser =  await usersModelsSql.getOneByLogin_sql(login)

        if(oneUser != undefined)
            return oneUser
        else
            return { errorMessage : `Le user portant le login : ${login} n'existe pas` }
    }
}


module.exports = {authServiceSql}