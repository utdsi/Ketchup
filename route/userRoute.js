
const express = require("express")

const userRouter = express.Router()
const { register, login, getallusers, getuserbyid, getuserbyFilter, editprofile, resetpassword, changePassword } = require("../controller/userController")
const { auth } = require("../middleware/auth")


userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/all", auth, getallusers)
userRouter.get("/usersid/:id", auth, getuserbyid)
userRouter.get("/userfilter/:id", auth, getuserbyFilter)
userRouter.patch("/edituser/:id", auth, editprofile)
userRouter.patch("/resetpassword", resetpassword)
userRouter.patch("/changepassword",auth,changePassword)


module.exports = { userRouter }