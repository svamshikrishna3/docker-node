const jwt = require('jsonwebtoken');
const config = require('config');

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.jwt.secret_key, (err, payload) => {
            if (err) {
                return reject(err)
            }
            resolve(payload)
        })
    })
}

const createToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, config.jwt.secret_key, (err, token) => {
            if (err) {
                return reject(err)
            }
            resolve(token)
        })
    })
}

module.exports = {
    verifyToken,
    createToken
}