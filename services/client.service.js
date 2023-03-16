const clientModels = require("../models/client.models")

const clientService = {
    getAll : () => {
        let allClient = clientModels.getAll()
        //BAL
        allClient = allClient.reverse()
        return allClient
    },

    getOne : (id) => {
        let oneClient = clientModels.getOne(id)
        //BAL
        return oneClient
    },

    create : (newClient) => {
        let newClientCreated = clientModels.create(newClient)
        //BAL
        return newClientCreated
    },

    update : (id) => {
        let upClient = clientModels.update(id)
        //BAL       
        return upClient
    },

    delete : (id) => {
        let oldClient = clientModels.delete(id)
        //BAL
        return oldClient
    }
}

module.exports = clientService