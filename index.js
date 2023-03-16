const express = require("express")
const app = express()
const port = process.env.PORT || 3000


app.use(express.json()) //permet de traiter le body du corp écris et converti en json utilisable


const routerBase = require("./routers/base.router")
app.use("/api/v1", routerBase)


app.all("*", (req, res, next) => {

    if(res.locals.message != undefined)
    {
        responseError = {
            Message : res.locals.message,
            ErrorCode : 404
        }
    }

    res.status(404).json(responseError)
})


app.use((error, req, res, next) => {
    console.log("Error URL : ", req.url)
    console.log("Error Message : " + error)
    res.status(500).json({ "Error" : req.url, "Message" : ""+error, "ErrorCode" : 500})
})



app.listen(port, console.log(`server start in port ${port}`))