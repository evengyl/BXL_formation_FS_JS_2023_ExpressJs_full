const clientService = require("../services/client.service")

const clientController = {

    getAll : (req, res) => {
        let allClient = clientService.getAll()
        //BAL TO DTO
        res.json(allClient)
    },

    getOne : (req, res) => {
        let id = parseInt(req.params.id)-1

        let oneClient = clientService.getOne(id)
        //BAL TO DTO
        res.json(oneClient)
    },

    create : (req, res) => {
        let newClient = req.body.name

        let newClientCreated = clientService.create(newClient)
        //BAL TO DTO
        res.json(newClientCreated)
    },

    update : (req, res) => {
        let id = parseInt(req.params.id)-1

        let upClient = clientService.update(id)
        //BAL TO DTO
        res.json(upClient)
    },


    delete : (req, res) => {
        let id = parseInt(req.params.id)-1

        let oldClient = clientService.delete(id)
        //BAL TO DTO
        res.json(oldClient)
    }
} 

module.exports = clientController