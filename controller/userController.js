
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { uuid } = require("uuidv4")
const nodemailer = require("nodemailer")
const { Op } = require("sequelize")

const { UserModel } = require("../model/userModel")
const { BlockModel } = require("../model/blockModel")

require("dotenv").config()

//--------------------------Signup-----------------------------
const register = async (req, res) => {

    const id = uuid()
    const { email, password, mobile } = req.body
    try {
        const user = await UserModel.findAll({ where: { email: email } })

        if (user.length > 0) {
            res.status(400).send({ "status": 2, "message": "user already present,please login", "data": [] })
        }
        bcrypt.hash(password, 6, async function (err, hash) {

            if (err) {
                res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
            } else {
                await UserModel.create({ User_Id: id, mobile_number: mobile, email: email, password: hash })
                res.status(200).send({ "status": 1, "message": "You have signed up successfully", "data": [] })
            }
        });

    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }
}

//-------------------------------Login----------------------------

const login = async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await UserModel.findAll({ where: { email: email } })

        if (user.length == 0) {
            res.status(400).send({ "status": 2, "message": "Unregistered user, please register first.", "data": [] })
        }


        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                res.status(400).send({ "status": 2, "message": "your password is incorrect.", "data": [] })
            }
            var token = jwt.sign({ User_Id: user.User_Id }, process.env.secret_key);

            res.status(200).send({ "status": 1, "message": "you have successfully logged in.", "token": token, "data": user })
        });

    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }
}

//--------------------------------------getAllUsers-----------------------

const getallusers = async (req, res) => {


    try {
        const users = await UserModel.findAll()
        res.status(200).send({ "status": 1, "message": "All users", "data": users })

    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }

}
//-----------------------------------getUserById----------------------------


const getuserbyid = async (req, res) => {

    const id = req.params.id
    try {
        const nonBlockedUsers = await UserModel.findAll({
            include: [{
                model: BlockModel,
                where: {
                    user_id: id,
                    status: false // Assuming 'false' means the user is not blocked, change it if your logic is different
                },
                attributes: [] // Exclude BlockModel attributes from the result
            }],
            attributes: { exclude: ['password'] }
        });


        res.status(200).send({ "status": 1, "message": "All users", "data": nonBlockedUsers })
    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }
}


//---------------------------------------getUserFIlter----------------------

const getuserbyFilter = async (req, res) => {
    const { location, age } = req.body; // Extract age from req.body
    const { id } = req.params.id

    try {
        let whereClause = { location: location };

        // Add age condition if age is provided
        if (age) {
            whereClause.age = { [Op.lte]: age }; // Using Sequelize operator for less than or equal to
        }

        const users = await UserModel.findAll({
            where: whereClause, include: [{
                model: BlockModel,
                where: {
                    user_id: id,
                    status: false // Assuming 'false' means the user is not blocked, change it if your logic is different
                },
                attributes: [] // Exclude BlockModel attributes from the result
            }],
            attributes: { exclude: ['password'] }
        });

        res.status(200).send({ "status": 1, "message": "Users filtered by location and age", "data": users });
    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occurred, please try again.", "data": [] });
    }
}


//------------------------------------editProfile------------------------------


const editprofile = async (req, res) => {

    try {
        const id = req.params.id
        const payload = req.body

        await UserModel.update(payload, { where: { User_Id: id } })
        res.status(200).send({ "status": 1, "message": "profile updated", "data": [] })
    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }

}


//-------------------------------forgot/reset Password--------------------------


const resetpassword = async (req, res) => {
    const { email } = req.body
    function generateRandomAlphabetString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters.charAt(randomIndex);
        }

        return result;
    }

    const randomAlphabetString = generateRandomAlphabetString(8);
    //---------------nodemailer-----------------------------------------------------------
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.net",
        port: 587,
        secure: false,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.USER,
            pass: process.env.APP_PASSWORD,
        },
    });


    const mailOptions = {
        from: {
            name: "Flutter App",
            address: process.env.USER
        },

        // sender address
        to: `${email}`, // list of receivers
        subject: "Reset Password", // Subject line
        text: `Your new password is ${randomAlphabetString}`, // plain text body
        html: `<b>Your new password is ${randomAlphabetString}</b>`, // html body
    }

    const sendMail = async (transporter, mailOptions) => {

        try {
            await transporter.sendMail(mailOptions)
        } catch (error) {
            console.log(error)
        }
    }

    sendMail(transporter, mailOptions)
    //---------------------------------------------------------------------------------



    try {

        const user = await UserModel.findAll({ where: { email: email } })

        if (!user) {
            res.status(200).send({ "status": 2, "message": "user not found", "data": [] })
        }

        await UserModel.update({ password: randomAlphabetString }, { where: { email: email } })

        res.status(200).send({ "status": 1, "message": "updated password has been sent to your email", "data": [] })

    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }


}




module.exports = { register, login, getallusers, getuserbyid, getuserbyFilter, editprofile, resetpassword }