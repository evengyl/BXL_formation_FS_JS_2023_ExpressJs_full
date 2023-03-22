const routerAuth = require("express").Router()
const {authController} = require("../controllers/auth.controller")
const { bodyValidation } = require("../middlewares/body-validation.middleware")
const { RegisterUserValidator, AuthUserValidator } = require("../validators/users.validator")


routerAuth.post("/login", bodyValidation(AuthUserValidator), authController.login)
routerAuth.post("/register", bodyValidation(RegisterUserValidator), authController.register)

module.exports = routerAuth