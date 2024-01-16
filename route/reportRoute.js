
const express = require("express")

const reportRouter = express.Router()

const { postReport } = require("../controller/reportController")
const { auth } = require("../middleware/auth")

reportRouter.post("/report/:id", auth, postReport)


module.exports = { reportRouter }
