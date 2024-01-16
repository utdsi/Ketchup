
const { uuid } = require("uuidv4")

const { ReportModel } = require("../model/reportModel")


//----------------------postReport----------------


const postReport = async (req, res) => {

    const id = req.params.id

    const { reported_u_id, user_comment } = req.body
    const Report_id = uuid()

    try {

        await ReportModel.create({ Report_id: Report_id, sender_u_id: id, reported_u_id: reported_u_id, user_comment: user_comment })
        res.status(200).send({ "status": 1, "message": "Friend reported successfully", "data": [] })

    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }


}

module.exports = { postReport }


