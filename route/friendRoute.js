
const express = require("express")

const friendRouter = express.Router()

const { sendFriendRequest, updateRequest, receivedrequest, getallfriends } = require("../controller/friendRequestController")
const { auth } = require("../middleware/auth")

friendRouter.post("/friendrequest", auth, sendFriendRequest)
friendRouter.patch("/editfriendrequest/:id", auth, updateRequest)
friendRouter.get("/receivedrequest/:id", auth, receivedrequest)
friendRouter.get("/allfriends/:id", auth, getallfriends)


module.exports = { friendRouter }