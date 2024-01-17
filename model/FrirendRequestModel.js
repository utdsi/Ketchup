

const { sequelize } = require("../config/db")

const { DataTypes, DATE } = require("sequelize")


const FriendModel = sequelize.define("friends", {

    Fr_req_Id: {

        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    sender_u_id: {
        type: DataTypes.STRING,


    },
    receiver_u_id: {
        type: DataTypes.STRING,

    },
    fr_req_status: {
        type: DataTypes.ENUM("Pending", "Accepted", "Decline"),
        defaultValue: "Pending"
    },
    created_at: {

        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }

})


module.exports = { FriendModel }