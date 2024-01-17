

const { uuid } = require("uuidv4")

const { FriendModel } = require("../model/FrirendRequestModel")
const { Op } = require("sequelize")
const { UserModel } = require("../model/userModel")


//-------------------friend request sent------------------------------------------------
const sendFriendRequest = async (req, res) => {


    const { sender_u_id, receiver_u_id } = req.body
    const id = uuid()

    try {
        await FriendModel.create({ Fr_req_Id: id, sender_u_id: sender_u_id, receiver_u_id: receiver_u_id })
        res.status(200).send({ "status": 1, "message": "Friend request has been sent successfully", "data": [] })
    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }
}


//--------------------change request status-----------------------------


const updateRequest = async (req, res) => {

    const { sender_u_id, fr_req_status } = req.body

    const id = req.params.id

    try {
        await FriendModel.update({ fr_req_status: fr_req_status }, { where: { receiver_u_id: id, sender_u_id: sender_u_id } })
        res.status(200).send({ "status": 1, "message": "Friend request updated", "data": [] })
    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }
}


//------------------------recived request-------------------------------------


const receivedrequest = async (req, res) => {

    const id = req.params.id
    try {
        const request = await FriendModel.findAll({
            where: { receiver_u_id: id },
            attributes: ['sender_u_id'],
            raw: true,
            nest: true,
            distinct: true,
          });
          const uniqueSenderIds = request.map(item => item.sender_u_id);
          const friends = await UserModel.findAll({
            where: {
                User_Id: uniqueSenderIds,
            },
        });
        const usersWithoutPassword = friends.map(user => omitPassword(user));

        res.status(200).send({ "status": 1, "message": "total request received", "data": usersWithoutPassword })
    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }
}

//------------------------getAllFriends---------------------------------------


//where: {
// [Op.or]: [
//     { sender_u_id: id },
//     { receiver_u_id: id }
//   ],
//   fr_req_status: 'Accept'
// }

const getallfriends = async (req, res) => {

    const id = req.params.id

    try {

        const friendRequests = await FriendModel.findAll({
            attributes: ['sender_u_id', 'receiver_u_id'],
            where: {
                fr_req_status: 'Accepted',
                [sequelize.Op.or]: [
                    { sender_u_id: id },
                    { receiver_u_id: id }
                ]
            },
            raw: true,
        });

        const friendUserIds = Array.from(new Set([...friendRequests.map(req => req.sender_u_id), ...friendRequests.map(req => req.receiver_u_id)]));

        const filteredUserIds = friendUserIds.filter(userId => userId !== id);

        const friends = await UserModel.findAll({
            where: {
                User_Id: filteredUserIds,
            },
        });


        const usersWithoutPassword = friends.map(user => omitPassword(user));


        res.status(200).send({ "status": 1, "message": "get friends list", "data": usersWithoutPassword })

    } catch (error) {
        res.status(400).send({ "status": 2, "message": "Some error occured, please try again.", "data": [] })
    }

}

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
}

module.exports = { sendFriendRequest, updateRequest, receivedrequest, getallfriends }

