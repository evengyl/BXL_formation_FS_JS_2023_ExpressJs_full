const comptaModels = require("../models/compta.models")

const comptaService = {
    getAll : (paramFilter) => {

        let allFact = comptaModels.getAll(paramFilter)
        
        //BAL
        let { creditLimit } = paramFilter
        if(creditLimit > 0)
        {
            allFact = allFact.filter((fact) => {

                fact.credit = fact.credit.replace("€", "")
                fact.credit = fact.credit.replace(",", ".")
                fact.credit = parseFloat(fact.credit)

                if(fact.credit <= creditLimit){
                    fact.credit = "€"+fact.credit
                    fact.credit = fact.credit.replace(".", ",")
                    return fact 
                }
            })
        }

        return allFact
    },

    getOne : (id) => {
        let oneFact = comptaModels.getOne(id)

        if(oneFact != undefined)
            return oneFact
        else
            return { errorMessage : `La facture n° ${id}, n'existe pas`}
        
        //BAL
    },

    create : (newFact) => {

        newFact.active = true

        let newFactCreated = comptaModels.create(newFact)
        //BAL
        return newFactCreated
    },

    update : (id, newLimitDate) => {

        let upFact = comptaModels.update(id, newLimitDate)

        if(upFact != undefined)
            return upFact
        else
            return { errorMessage : `La facture numéro : ${id}, n'existe pas`}
    },

    delete : (id) => {
        let oldFact = comptaModels.delete(id)

        if(oldFact != undefined)
            return oldFact
        else
            return { errorMessage : `La facture n° ${id}, n'existe pas`}
    }
}

module.exports = comptaService