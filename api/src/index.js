const express = require("express")
require("dotenv").config()

const initDb = require("./config/db")
const commodityRoute = require("./route/commodity.route")

const app = express()
const router = express.Router()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/v1", router)
commodityRoute(router)

app.get("*", (req, res) => {
    res.send("Api is live")
})

app.listen(PORT, async () => {
    await initDb()
    console.log("Application is listening on port:", PORT)
})

module.exports = app