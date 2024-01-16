
const { sequelize } = require("../config/db")

const { DataTypes, DATE } = require("sequelize")

const BlockModel = sequelize.define("blocks", {

    Block_id: {

        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    user_id: {
        type: DataTypes.STRING,


    },
    blocked_user_id: {
        type: DataTypes.STRING,

    },
    status: {

        type: DataTypes.BOOLEAN,

    },
    created_at: {

        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }

})

module.exports = { BlockModel }