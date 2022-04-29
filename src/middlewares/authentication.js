const { jwt } = require('./../utils')

const secureRoutes = (req, res, next) => {
    console.log(req.headers);
    const { authorization } = req.headers;
    jwt.verifyToken(authorization)
        .then(payload => {
            req.payload = payload
            next()
        })
        .catch(e => {
           res.status(400).send("invalid Token")
        })
}

module.exports = {
    secureRoutes
}