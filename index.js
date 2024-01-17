

const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())


const { sequelize } = require("./config/db")
const { userRouter } = require("./route/userRoute")
const { reportRouter } = require("./route/reportRoute")
const { friendRouter } = require("./route/friendRoute")
const { blockRouter } = require("./route/blockRoute")
const { chatRouter } = require("./route/chatRoute")

require("dotenv").config()

app.get("/", (req, res) => {

    res.send("Welcome to my Flutter dating App")
})

app.use("/user", userRouter)
app.use("/report", reportRouter)
app.use("/friend", friendRouter)
app.use("/block", blockRouter)
app.use("/chat", chatRouter)

app.listen(process.env.port, async () => {

    try {
        
        await sequelize.sync();
console.log("All models were synchronized successfully.");
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }

})