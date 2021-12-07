'use strict';

const Chance = require('chance');
const chance = new Chance();
const { cloneDeep } = require('lodash');

const {
    ordersRepository
} = require('../../../src/frameworks/repositories/inMemory');

const { 
    Order 
} = require("../../../src/entities");

describe('Orders Repository', () => {
    test('New order should be created and returned', 
    async () => {
        const testOrder = new Order({
            userId: chance.guid({ version: 4 }),
            productIds: [
                chance.guid({ version: 4 }),
                chance.guid({ version: 4 }),
            ],
            date: chance.date(),
            isPaid: chance.bool(),
            meta: {},            
        });

        const storedOrder = await ordersRepository.store(testOrder);

        expect(storedOrder).toBeDefined();
        expect(storedOrder.id).toBeDefined();
        expect(storedOrder.userId).toBe(testOrder.userId);
        expect(storedOrder.productIds).toBe(testOrder.productIds);
        expect(storedOrder.date).toBe(testOrder.date);
        expect(storedOrder.isPaid).toBe(testOrder.isPaid);
        expect(storedOrder.meta).toEqual(testOrder.meta);

        const returnedOrder = await ordersRepository.show(storedOrder.id);

        expect(returnedOrder).toEqual(storedOrder);
    });
});