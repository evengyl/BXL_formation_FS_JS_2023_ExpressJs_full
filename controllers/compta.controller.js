const comptaService = require("../services/compta.service")

const comptaController = {

    getAll : (req, res) => {

        let query = req.query


        //filter part active fact
        let active = false
        if(query.active != undefined){
            if(Boolean(query.active))
                active = query.active   
        }
        //const good = Boolean(expression);    // use this
        //const good2 = !!(expression);        // or this
        //const bad = new Boolean(expression); // don't use this!
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean


        //filter part limit solde
        let creditLimit = 0
        if(query.creditLimit != undefined){
            if(parseInt(query.creditLimit) > 0){
                creditLimit = query.creditLimit
            }
        }

        let paramFilter = {
            active,
            creditLimit
        }


        let allFact = comptaService.getAll(paramFilter)
        //BAL TO DTO
        res.json(allFact)
    },

    getOne : (req, res, next) => {
        let id = req.params.id

        let oneFact = comptaService.getOne(id)

        if(oneFact.id != undefined)
            res.json(oneFact)
        else{
            res.locals.message = oneFact
            next()
        }

    },

    create : (req, res, next) => {
        
        if(req.body.credit != undefined && req.body.limitDate != undefined)
        {
            let newFact = {
                credit : req.body.credit,
                limitDate : req.body.limitDate
            }

            let newFactCreated = comptaService.create(newFact)
            //BAL TO DTO
            res.json(newFactCreated)
        }
        else{
            throw new Error("Les paramètres du body ne sont pas complet !")
        }

        
    },

    update : (req, res, next) => {

        let id = req.params.id

        if(req.body.newLimitDate != undefined){

            let newLimitDate = req.body.newLimitDate
            
            let upFact = comptaService.update(id, newLimitDate)

            if(upFact.id != undefined)
                res.json(upFact)
            else{
                res.locals.message = upFact
                next()
            }
        }
        else{
            throw new Error("Les paramètres du body ne sont pas complet !")
        }
    },


    delete : (req, res, next) => {
        let id = req.params.id

        let oldFact = comptaService.delete(id)

        if(oldFact.id != undefined)
            res.json(oldFact)
        else{
            res.locals.message = oldFact
            next()
        }
    }
} 

module.exports = comptaController