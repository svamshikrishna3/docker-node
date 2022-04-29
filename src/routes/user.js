const express = require('express');
const userRouter = express.Router({ mergeParams: true });

const { userController } = require("./../controllers")

userRouter.route('/')
    .get(
        userController.getAllUsers)
    .post(userController.createUser)
    
userRouter.route('/:id')
    .get(userController.deleteUserById)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById)

userRouter.route('/search')
    .get(userController.searchUsers)

module.exports = userRouter;

