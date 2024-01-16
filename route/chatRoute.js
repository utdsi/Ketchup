
const express = require("express")

const chatRouter = express.Router()

const { postchat, updatechat, getchat } = require("../controller/chatController")
const { auth } = require("../middleware/auth")


chatRouter.post("/postchat/:sender_id", auth, postchat)
chatRouter.patch("/sendchat/:sender_id", auth, updatechat)
chatRouter.get("/getchat/:sender_id", auth, getchat)

module.exports = { chatRouter }