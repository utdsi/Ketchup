
const express = require("express")
const blockRouter = express.Router()


const { postBlock, getALLBlockPerson, updateBlockPerson } = require("../controller/blockController")
const { auth } = require("../middleware/auth")


blockRouter.post("/postblock/:id", auth, postBlock)
blockRouter.get("/getallblock/:id", auth, getALLBlockPerson)
blockRouter.patch("/editblock/:id", auth, updateBlockPerson)

module.exports = { blockRouter }