

const { sequelize } = require("../config/db")

const { DataTypes, DATE } = require("sequelize")

const UserModel = sequelize.define("users", {

    User_Id: {

        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    mobile_number: {
        type: DataTypes.INTEGER(10),
        unique: true

    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    f_name: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    l_name: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    gender: {
        type: DataTypes.ENUM("Male", "Female", "Others"),
        defaultValue: null
    },
    dob: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    height: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    body_type: {

        type: DataTypes.STRING,
        defaultValue: null
    },
    short_bio: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    profile_pic: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    profile_visible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    location: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    marital_status: {
        type: DataTypes.ENUM('Single', 'Married', 'Divorced', 'Widowed', 'Separated'),
        defaultValue: null
    },
    religion: {
        type: DataTypes.ENUM('Christianity', 'Islam', 'Hinduism', 'Buddhism', 'Judaism', 'Other'),
        defaultValue: null
    },
    occupation: {

        type: DataTypes.ENUM("InCollege", "Working", "Business", "SittingIdle"),
        defaultValue: null,
        
    },
    created_at: {

        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: null
    },
    profile_status: {

        type: DataTypes.ENUM("0", "1", "2"),
        defaultValue: "1"
    }

})


module.exports = { UserModel }