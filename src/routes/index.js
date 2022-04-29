const express = require("express")
const rootRouter = express.Router();
const { authMiddlewares } = require('./../middlewares')

const userRouter = require("./user");
const authRouter = require('./auth');

rootRouter.use('/users',authMiddlewares.secureRoutes, userRouter)
rootRouter.use('/', authRouter)

rootRouter.get('/', (_req, res) => {
    console.log("testing the server");
    res.status(200).send({message: "OK"})
})

module.exports = rootRouter;

