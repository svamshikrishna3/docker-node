const { User } = require("../models")
const q = require("../db/mongo/queries");
const { jwt } = require("../utils")


const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error('email and password are required fields');
        }
        const resp = await q.createOne(User)(req, res);
        console.log('whag s reswp', resp);
        res.status(201).send(resp)
    } catch (e) {
        res.status(400).send(e.message)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        req.q = {
            email
        }
        const user = await q.getOne(User)(req, res);
        if (!user) {
            throw new Error('Invalid email and password')
        }
        const isPasswCorrect = await user.checkPassword(password)
        if (!isPasswCorrect) {
            throw new Error('Invalid email and password')
        } 
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role || ''
        }
        jwt.createToken(payload)
            .then((token) => {
                res.setHeader('auth-token', token);
                res.send('OK').status(200)
            })
            .catch(e => {
                throw e
            })
        
    } catch(e) {
        res.status(400).send(e.message)
    }
}

const logout = (req,res) => {

}

module.exports = {
    signup,
    login,
    logout
}