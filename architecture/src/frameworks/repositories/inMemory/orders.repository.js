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
    },
    update: async order => {
        const orderIndex = inMemoryDb.orders.findIndex(
            storedOrder => storedOrder.id === order.id
        );

        if (orderIndex >= 0) {
            inMemoryDb.orders[orderIndex] = order; 
            return inMemoryDb.orders[orderIndex];
        }
        return { status: 404 };
    },
    delete: async order => {
        let orderDeleted = false; 
        
        const orderIndex = inMemoryDb.orders.findIndex(
            storedOrder => storedOrder.id === order.id
        )

        if (orderIndex >= 0) {
            orderDeleted = inMemoryDb.orders.splice(orderIndex, 1);
        }

        if (orderDeleted) {
            return { status: 204 };
        }
        return { status: 500 };
    }
}