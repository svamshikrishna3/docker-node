const express = require("express")
const authRouter = express.Router({ mergeParams: true });

const { jwtController } = require("./../controllers");

authRouter.post('/signup', jwtController.signup);
authRouter.post('/auth', jwtController.login);
authRouter.get('/logout', jwtController.logout);

module.exports = authRouter;