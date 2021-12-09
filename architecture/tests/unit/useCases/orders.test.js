'use strict';

const Chance = require('chance');
const chance = new Chance();
const { v4: uuidV4 } = require('uuid');

const {
    order: {
        addOrderUseCase,
        updateOrderUseCase,
        deleteOrderUseCase,
    }
} = require('../../../src/useCases');

describe('Order use cases', () => {

    const mockOrderRepo = {
        store: jest.fn(
            async order => ({
                ...order,
                id: uuidV4(),
            }) 
        ),
        update: jest.fn(
            async order => order,
        ),
        delete: jest.fn(
            async order => order,
        )
    }

    const dependencies = {
        ordersRepository: mockOrderRepo,
    }

    test('Add order use case', 
    async () => {
        const testOrderData = {
            userId: uuidV4(),
            productIds: [uuidV4(), uuidV4()],
            date: chance.date(),
            isPaid: chance.bool(),
            meta: {},
        }

        const storedOrder = await addOrderUseCase(dependencies).execute(testOrderData);

        expect(storedOrder).toBeDefined();
        expect(storedOrder.id).toBeDefined();
        expect(storedOrder.userId).toBe(testOrderData.userId);
        expect(storedOrder.productIds).toBe(testOrderData.productIds);
        expect(storedOrder.date).toBe(testOrderData.date);
        expect(storedOrder.isPaid).toBe(testOrderData.isPaid);
        expect(storedOrder.meta).toEqual(testOrderData.meta);

        const call = mockOrderRepo.store.mock.calls[0][0];
        expect(call.id).toBeUndefined();
        expect(call.userId).toBe(testOrderData.userId);
        expect(call.productIds).toBe(testOrderData.productIds);
        expect(call.date).toBe(testOrderData.date);
        expect(call.isPaid).toBe(testOrderData.isPaid);
        expect(storedOrder.meta).toBe(testOrderData.meta);
    });

    test('Update order use case', 
    async () => {
        const testOrderData = {
            userId: uuidV4(),
            productIds: [uuidV4(), uuidV4()],
            date: chance.date(),
            isPaid: chance.bool(),
            meta: {},
        }
        const updatedOrder = await updateOrderUseCase(dependencies).execute({
            order: testOrderData,
        });
        expect(updatedOrder).toEqual(testOrderData);

        const expectedOrder = mockOrderRepo.update.mock.calls[0][0];
        expect(expectedOrder).toEqual(updatedOrder);
    });

    test('Delete order use case', 
    async () => {
        const testOrderData = {
            userId: uuidV4(),
            productIds: [uuidV4(), uuidV4()],
            date: chance.date(),
            isPaid: chance.bool(),
            meta: {},
        }

        const deletedOrder = await deleteOrderUseCase(dependencies).execute({
            order: testOrderData,
        });
        expect(deletedOrder).toEqual(testOrderData);

        const expectedOrder = mockOrderRepo.delete.mock.calls[0][0];
        expect(expectedOrder).toEqual(deletedOrder);
    });
});