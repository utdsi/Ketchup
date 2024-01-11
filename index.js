

const express = require("express")

const app = express()

app.use(express.json())


const {sequelize}  = require("./config/db")


require("dotenv").config()

app.get("/",(req,res)=>{

    res.send("Welcome to my Flutter App")
})


app.listen(process.env.port, async()=>{

    try {
        await sequelize.sync()
        console.log("conneccted to db")
    } catch (error) {
        console.log(error)
    }
    
})