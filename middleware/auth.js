const jwt = require("jsonwebtoken")

require('dotenv').config()


const auth = (req, res, next) => {


    const token = req.headers?.authorization

    if (token) {
        const decoded = jwt.verify(token, process.env.secret_key)

        if (decoded) {

            next()
        }
    } else {
        res.status(400).send({ "msg": "You are not authenticated" })
    }
}

module.exports = { auth }