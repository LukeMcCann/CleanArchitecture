'use strict';

const addUserController = require('./addUser.controller');
const showUserController = require('./showUser.controller');
const updateUserController = require('./updateUser.controller');
const deleteUserController = require('./deleteUser.controller');

module.exports = dependencies => {

    return {
        addUserController: addUserController, 
        showUserController: showUserController, 
        updateUserController: updateUserController, 
        deleteUserController: deleteUserController,
    }
}