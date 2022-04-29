const User = require("./../models").User;

const q = require("./../db/mongo/queries");

const createUser = async (req, res) => {
    const resp = await q.createOne(User)(req, res)
    res.status(201).send(resp)
}

const getAllUsers = async (req,res) => {
    req.q = {}
    const resp = await q.getMany(User)(req, res)
    res.status(200).send(resp)

}

const getUserById = async (req, res) => {
    const resp = await q.getById(User)(req,res)
    res.status(200).send(resp)
}

const updateUserById = async (req, res) => {
    const resp = await q.updateOne(User)(req, res)
    res.status(200).send(resp)
}

const deleteUserById = async (req, res) => {
    const resp = await q.deleteOne(User)(req, res)
    res.status(200).send(resp) 
}

const searchUsers = async (req, res) => {
    console.log(req.query);
    const resp = await q.search(User)(req, res);

    res.status(200).send(resp)
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    searchUsers
}