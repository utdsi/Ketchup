const { sequelize } = require("../config/db")

const { DataTypes, DATE } = require("sequelize")

const ReportModel = sequelize.define("reports", {

    Report_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    sender_u_id: {
        type: DataTypes.STRING,

    },
    reported_u_id: {
        type: DataTypes.STRING
    },
    report_status: {
        type: DataTypes.ENUM["resolved", "pending"],
        defaultValue: "pending"

    },
    user_comment: {
        type: DataTypes.STRING
    },
    action_comment: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    created_at: {

        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }



})

module.exports = { ReportModel }