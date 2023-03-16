let listFact = ["fact1", "fact2", "fact3", "fact4"]
const factures = require("../datas/factures.json")

const comptaModels = {
    
    getAll : (paramFilter) => {

        let { active } = paramFilter

        //let facturesReturn = structuredClone(factures) -> a partir de node v17 !!
        let facturesReturn = JSON.parse(JSON.stringify(factures))
        
        if(active)
            facturesReturn = facturesReturn.filter(fact => fact.active == true)

        return facturesReturn
    },

    getOne : (id) => {
        let oneFact = factures.find(fact => fact.id == id)
        return oneFact
    },

    create : (newFact) => {

        let returnedFact = { 
            id : factures.length+1,
            ...newFact
        }

        factures.push(returnedFact)
        return returnedFact = factures.find(fact => fact.id == factures.length)
    },

    update : (id, newLimitDate) => {

        let indexFactFound = factures.findIndex(fact => fact.id == id)

        if(indexFactFound != -1)
            factures[indexFactFound].limitDate = newLimitDate

        return factures[indexFactFound]
    },

    delete : (id) => {
        
        let indexFactFound = factures.findIndex(fact => fact.id == id)

        if(indexFactFound != -1)
            factures[indexFactFound].active = false

        return factures[indexFactFound]
    }
}


module.exports = comptaModels