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
            inMemoryDb.users[index] = user;
            return inMemoryDb.users[index];
        }
        return { status: 404 };
    },
    delete: async user => {
        const userIndex = inMemoryDb.users.findIndex(
            storedUser => storedUser.id === user.id
        );

        if (userIndex >= 0) {
            inMemoryDb.users.splice(userIndex);
        }

        const userDeleted = inMemoryDb.users.findIndex(
            deletedUser => deletedUser.id === user.id
        );

        if (userDeleted) {
            return { status: 204 };
        }
        return { status: 500 };
    },
}