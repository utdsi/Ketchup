

const { uuid } = require("uuidv4")

const { BlockModel } = require("../model/blockModel")


//------------------------------------postBlock--------------------------

const postBlock = async (req, res) => {

    const id = req.params.id
    const { blocked_user_id } = req.body
    const Block_id = uuid()

    try {

        await BlockModel.create({ Block_id: Block_id, user_id: id, blocked_user_id: blocked_user_id, status: true })
        res.status(200).send({ "status": 1, "message": "Friend blocked successfully", "data": [] })

    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }
}

//---------------------------------------getList------------------------------


const getALLBlockPerson = async (req, res) => {

    const id = req.params.id

    try {
        const blockedList = await BlockModel.findAll({ where: { user_id: id, status: true } })
        res.status(200).send({ "status": 1, "message": "total blocked list", "data": blockedList })
    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }
}

//-------------------------------updateBlock--------------------------------------


const updateBlockPerson = async (req, res) => {

    const id = req.params.id
    const { blocked_user_id } = req.body
    try {
        await BlockModel.update({ status: false }, { where: { user_id: id, blocked_user_id: blocked_user_id } })
        res.status(200).send({ "status": 1, "message": "you have unblocked the person", "data": [] })
    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }
}



module.exports = { postBlock, getALLBlockPerson, updateBlockPerson }