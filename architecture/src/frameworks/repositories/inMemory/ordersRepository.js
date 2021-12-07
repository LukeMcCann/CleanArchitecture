'use strict';

const { inMemory: inMemoryDb } = require('../../database');
const { v4: uuidV4 } = require('uuid');

module.exports = {
    store: async order => {
        if (!order.id) {
            order.id = uuidV4();
        }

        inMemoryDb.orders.push(order);

        return order;
    },
    show: async id => {
        return inMemoryDb.orders.find(order => order.id === id);
    }
}