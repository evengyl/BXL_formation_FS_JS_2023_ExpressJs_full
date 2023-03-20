const paramsValidation = (yupValidator) => {

    return (req, res, next) => {

        yupValidator.noUnknown().validate(req.params, {}).then((paramsValidate) => {
            req.paramsValidate = paramsValidate
            next()

        })
        .catch((error) => {

            res.status(400).json(error.errors)

        })
        
    }
}


module.exports = {
    paramsValidation
}
