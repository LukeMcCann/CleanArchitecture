'use strict';

const express = require('express');

const {
    userControllers,
} = require('../../../controllers');

module.exports = dependencies => {

    const router = express.Router();

    const {
        addUserController, 
        showUserController, 
        updateUserController,
        deleteUserController,
     } = userControllers(dependencies);

     router.route('/')
        .post(addUserController)
        .delete(deleteUserController)
        .put(updateUserController);

    router.route('/:id')
        .get(showUserController);

     return router; 
}
