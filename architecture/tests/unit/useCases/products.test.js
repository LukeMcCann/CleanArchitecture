'use strict';

const Chance = require('chance');
const chance = new Chance();
const { v4: uuidV4 } = require('uuid');

const {
    product: {
        addProductUseCase, 
    }
} = require('../../../src/useCases');

const {
    Product,
} = require('../../../src/entities');

describe('Product use cases', () => {

    const mockProductRepo = {
        store: jest.fn(
            async product => ({
                ...product, 
                id: uuidV4(),
            })
        )
    }

    const dependencies = {
        productsRepository: mockProductRepo
    }

    test('Add product use case', 
    async () => {
        const testProductData = {
            name: chance.name(),
            description: chance.sentence({ words: 5 }),
            images: [chance.url(), chance.url()],
            price: chance.euro(),
            color: chance.color({ format: 'hex' }),
            meta: {},
        }

        const storedProduct = await addProductUseCase(dependencies).execute(testProductData);

        expect(storedProduct).toBeDefined();
        expect(storedProduct.id).toBeDefined();
        expect(storedProduct.name).toBe(testProductData.name);
        expect(storedProduct.description).toBe(testProductData.description);
        expect(storedProduct.images).toBe(testProductData.images);
        expect(storedProduct.price).toBe(testProductData.price);
        expect(storedProduct.color).toBe(testProductData.color);
        expect(storedProduct.meta).toEqual(testProductData.meta);

        const call = mockProductRepo.store.mock.calls[0][0];
        expect(call.id).toBeUndefined();
        expect(call.name).toBe(testProductData.name);
        expect(call.description).toBe(testProductData.description);
        expect(call.images).toBe(testProductData.images);
        expect(call.price).toBe(testProductData.price);
        expect(call.color).toBe(testProductData.color);
        expect(call.meta).toEqual(testProductData.meta);
    });
});