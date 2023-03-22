const {authServiceSql} = require("../services/auth.service")
const { generateToken } = require("../utils/jwt.utils")
const bcrypt = require("bcrypt")

const authController = {


    login : async (req, res, next) => {

        let authUser = req.dataValidate

        let userExist = await authServiceSql.getOneByLogin_sql(authUser.login)

        if(userExist.id != undefined)
        {
            let comparePassword = await bcrypt.compare(authUser.pwd, userExist.pwd)

            if(comparePassword){
                let token = await generateToken(userExist)
                res.json({jwt : token})
            }
            else{
                res.locals.message = { errorMessage : `Le pwd du user login : ${authUser.login} n'est pas correct` }
                next()
            }
        }
        else if(userExist.errorMessage != undefined)
        {
            res.locals.message = userExist
            next()
        }
        
    },

    register : async (req, res, next) => {
        let userInfos = req.dataValidate
        //faire des trucs
        let insertedUser = await authServiceSql.create_sql(userInfos)

        let token = await generateToken(insertedUser)
        res.json({jwt : token})
    }
}


module.exports = {
    authController
}