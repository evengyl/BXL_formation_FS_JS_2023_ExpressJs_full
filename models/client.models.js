let listClient = ["client1", "client2", "client3", "client4"]

const clientModels = {
    
    getAll : () => {
        return [...listClient]
    },

    getOne : (id) => {
        return listClient[id]
    },

    create : (newClient) => {
        listClient.push(newClient)
        return listClient[listClient.length-1]
    },

    update : (id) => {
        listClient[id] = "updated client" + (parseInt(id)+1)
        return [...listClient]
    },

    delete : (id) => {
        listClient[id] = "deleted client" + (parseInt(id)+1)
        return [...listClient]
    }
}


module.exports = clientModels