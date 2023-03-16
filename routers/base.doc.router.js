const express = require("express")
const router = express.Router()

const docController = require("../controllers/doc.controller")

router.get("/", docController.getHome)
router.get("/allEmployees", docController.getEmployees)
router.get("/rest/employees", docController.getDocRestEmployees)

module.exports = router