



const { uuid } = require("uuidv4")

const { ChatModel } = require("../model/chatModel")
const { FriendModel } = require("../model/FrirendRequestModel")

//---------------------------postChat----------------------------

const postchat = async (req, res) => {

    const sender_id = req.params.id
    const { receiver_id, message } = req.body
    const Chat_id = uuid()

    try {
        await ChatModel.create({ Chat_id: Chat_id, sender_u_id: sender_id, receiver_u_id: receiver_id, message: message })
        res.status(200).send({ "status": 1, "message": "Initiated first chat", "data": [] })
    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }
}

//----------------------------patchChat-----------------------------

const updatechat = async (req, res) => {

    const sender_id = req.params.id
    const { receiver_id, message } = req.body

    try {
        await ChatModel.update({ message: message }, { where: { sender_u_id: sender_id, receiver_u_id: receiver_id } })
        res.status(200).send({ "status": 1, "message": "Updated chat", "data": [] })
    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }

}

//----------------------------getChats--------------------------------

const getchat = async (req, res) => {

    const sender_id = req.params.id
    const { receiver_id } = req.body

    try {
        const chat = await ChatModel.findAll({ where: { sender_u_id: sender_id, receiver_u_id: receiver_id } })
        res.status(200).send({ "status": 1, "message": "Chats list", "data": chat })
    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }
}



module.exports = { postchat, updatechat, getchat }
