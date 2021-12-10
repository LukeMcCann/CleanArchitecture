'use strict';

const { inMemory: inMemoryDb } = require('../../database');
const { v4: uuidV4 } = require('uuid');

module.exports = {
    store: async user => {
        if (!user.id) {
            user.id = uuidV4();
        }

        inMemoryDb.users.push(user);

        return user;
    },
    show: async id => {
        return inMemoryDb.users.find(user => user.id === id);
    },
    update: async user => {
        const userIndex = inMemoryDb.users.findIndex(
            storedUser => storedUser.id === user.id
        );

        if (userIndex >= 0) {
            inMemoryDb.users[userIndex] = user;
            return inMemoryDb.users[userIndex];
        }
        return null;
    },
    delete: async user => {
        const userIndex = inMemoryDb.users.findIndex(
            storedUser => storedUser.id === user.id
        );

        if (userIndex >= 0) {
            inMemoryDb.users.splice(userIndex, 1);
            return user; 
        }
        return null;
    },
}