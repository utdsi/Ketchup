

const { sequelize } = require("../config/db")

const { DataTypes, DATE } = require("sequelize")

const ChatModel = sequelize.define("chats", {

    Chat_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    sender_u_id: {
        type: DataTypes.STRING,

    },
    receiver_u_id: {
        type: DataTypes.STRING
    },
    message: {
        type: DataTypes.TEXT
    },
    created_at: {

        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }




})


module.exports = { ChatModel }