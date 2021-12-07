'use strict';

const Chance = require('chance');
const chance = new Chance();

const { 
    productsRepository 
} = require('../../../src/frameworks/repositories/inMemory');

const {
    Product
} = require('../../../src/entities');

describe('Products Repository', () => {
    test('New product should be added and returned',
    async () => {
         const testProduct = new Product({
            name: chance.name(),
            description: chance.sentence({ words: 5 }),
            price: chance.euro(), 
            color: chance.color({ format: 'hex' }),
            meta: {}
         });

        const storedProduct = await productsRepository.store(testProduct);

        expect(storedProduct).toBeDefined();
        expect(storedProduct.id).toBeDefined();
        expect(storedProduct.name).toBe(testProduct.name);
        expect(storedProduct.description).toBe(testProduct.description);
        expect(storedProduct.price).toBe(testProduct.price);
        expect(storedProduct.color).toBe(testProduct.color);
        expect(storedProduct.meta).toEqual(testProduct.meta);
    });
});