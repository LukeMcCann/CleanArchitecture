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

    test('Order should be deleted',
    async () => {
        const orderToKeep = new Order({
            userId: chance.guid({ version: 4 }),
            productIds: [
                chance.guid({ version: 4 }),
                chance.guid({ version: 4 }),
            ],
            date: chance.date(),
            isPaid: chance.bool(),
            meta: {},            
        }); 

        const orderToDelete = new Order({
            userId: chance.guid({ version: 4 }),
            productIds: [
                chance.guid({ version: 4 }),
                chance.guid({ version: 4 }),
            ],
            date: chance.date(),
            isPaid: chance.bool(),
            meta: {},            
        }); 

        const [ storedOrderToKeep, storedOrderToDelete ] = await Promise.all([
            ordersRepository.store(orderToKeep),
            ordersRepository.store(orderToDelete),
        ]);

        expect(storedOrderToKeep).toBeDefined();
        expect(storedOrderToDelete).toBeDefined();

        const { status } = await ordersRepository.delete(orderToDelete);

        expect(status).toEqual(204);

        const keptOrder = await ordersRepository.show(orderToKeep.id);
        expect(keptOrder).toEqual(orderToKeep);

        const deletedOrder = await ordersRepository.show(orderToDelete.id);
        expect(deletedOrder).toBeUndefined();
    });
});